import { useMemo } from 'react';
import { ClipboardList, IndianRupee, Target, Users } from 'lucide-react';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { Card } from '@/components/ui/Card';
import { attendanceRecords, employees, performanceMetrics } from '@/constants/mockData';
import { formatCurrency } from '@/utils/format';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';
import { StatusBadge } from '@/components/common/StatusBadge';
import { AnnouncementBoard } from './AnnouncementBoard';

export const TeamLeaderDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const adminMonthlyTargetAmount = useAdminStore((state) => state.monthlyTargetAmount);
  const teamMembers = useMemo(() => employees.filter((item) => item.teamLeader === user?.name), [user]);
  const teamNames = teamMembers.map((item) => `${item.firstName} ${item.lastName}`);
  const teamPerformance = performanceMetrics.filter((item) => item.teamLeader === user?.name);
  const teamAttendance = attendanceRecords.filter((item) => teamNames.includes(item.employeeName));
  const averageMonthCompletion = Math.round(teamPerformance.reduce((sum, item) => sum + item.monthCompletion, 0) / Math.max(teamPerformance.length, 1));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Leader Dashboard"
        description="Manage only your team members, review their reports, and track monthly commitments for your team."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="My Team Members" value={String(teamMembers.length)} meta="Direct reports only" icon={<Users size={22} />} />
        <StatsCard label="Daily Reports Pending" value={String(teamPerformance.filter((item) => item.dailyReportingStatus === 'Pending').length)} meta="Follow up required" icon={<ClipboardList size={22} />} />
        <StatsCard label="Monthly Commitment Completion" value={`${averageMonthCompletion}%`} meta="Based on your team monthly commitments" icon={<Target size={22} />} />
        <StatsCard label="Admin Monthly Goal" value={formatCurrency(adminMonthlyTargetAmount)} meta="Shared target visible to business roles" icon={<IndianRupee size={22} />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <DataTable
          data={teamPerformance}
          columns={[
            { key: 'employee', header: 'Team Member', render: (item) => item.employeeName },
            { key: 'prod', header: 'Productivity', render: (item) => `${item.productivityScore}%` },
            { key: 'quality', header: 'Quality', render: (item) => `${item.qualityScore}%` },
            { key: 'month', header: 'Month Commitment', render: (item) => `${item.monthCompletion}%` },
            { key: 'disbursal', header: 'Disbursal', render: (item) => formatCurrency(item.disbursalAmount) },
            {
              key: 'report',
              header: 'Daily Report',
              render: (item) => <StatusBadge label={item.dailyReportingStatus} tone={item.dailyReportingStatus === 'Submitted' ? 'success' : 'warning'} />,
            },
          ]}
        />

        <Card>
          <h3 className="text-lg font-semibold text-slate-900">Today&apos;s Team Attendance</h3>
          <div className="mt-5 space-y-3">
            {teamAttendance.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">{item.employeeName}</p>
                  <StatusBadge label={item.status} tone={item.status === 'Present' ? 'success' : 'danger'} />
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {item.punchIn} to {item.punchOut} • {item.workingHours}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AnnouncementBoard role="Team Leader" />
    </div>
  );
};

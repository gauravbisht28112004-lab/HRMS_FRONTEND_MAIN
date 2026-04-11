import { Activity, IndianRupee, Megaphone, Users } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { Card } from '@/components/ui/Card';
import { announcements, employees, performanceMetrics } from '@/constants/mockData';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAdminStore } from '@/store/adminStore';
import { formatCurrency } from '@/utils/format';
import { AnnouncementBoard } from './AnnouncementBoard';

export const AdminDashboard = () => {
  const monthlyTargetAmount = useAdminStore((state) => state.monthlyTargetAmount);
  const updateMonthlyTargetAmount = useAdminStore((state) => state.updateMonthlyTargetAmount);
  const [draftTarget, setDraftTarget] = useState(String(monthlyTargetAmount));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Command Dashboard"
        description="Publish org-wide announcements, monitor workforce performance, and set the monthly amount target for all business dashboards."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Active Employees" value={String(employees.filter((item) => item.status === 'Active').length)} meta="Across all departments" icon={<Users size={22} />} />
        <StatsCard label="Live Announcements" value={String(announcements.length)} meta="Visible across dashboards" icon={<Megaphone size={22} />} />
        <StatsCard label="Monthly Target" value={formatCurrency(monthlyTargetAmount)} meta="Set by admin in rupees" icon={<IndianRupee size={22} />} />
        <StatsCard label="Daily Reports" value={`${performanceMetrics.filter((item) => item.dailyReportingStatus === 'Submitted').length}/${performanceMetrics.length}`} meta="Submission compliance today" icon={<Activity size={22} />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <DataTable
          data={performanceMetrics}
          columns={[
            { key: 'employee', header: 'Employee', render: (item) => item.employeeName },
            { key: 'teamLeader', header: 'Team Leader', render: (item) => item.teamLeader },
            { key: 'prod', header: 'Productivity', render: (item) => `${item.productivityScore}%` },
            { key: 'quality', header: 'Quality', render: (item) => `${item.qualityScore}%` },
            { key: 'attendance', header: 'Attendance', render: (item) => `${item.attendanceScore}%` },
            { key: 'disbursal', header: 'Disbursal', render: (item) => formatCurrency(item.disbursalAmount) },
            { key: 'month', header: 'Month Target', render: (item) => `${item.monthCompletion}%` },
          ]}
        />

        <Card>
          <h3 className="text-lg font-semibold text-slate-900">Admin Monthly Target Control</h3>
          <p className="mt-2 text-sm text-slate-600">Set the rupee target that appears on Admin, Team Leader, and Employee dashboards.</p>
          <div className="mt-5 space-y-4">
            <Input
              label="Monthly Target Amount (INR)"
              type="number"
              value={draftTarget}
              onChange={(event) => setDraftTarget(event.target.value)}
            />
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Current published target: <span className="font-semibold text-slate-900">{formatCurrency(monthlyTargetAmount)}</span>
            </div>
            <Button onClick={() => updateMonthlyTargetAmount(Number(draftTarget) || 0)}>Publish Monthly Target</Button>
          </div>
        </Card>
      </div>

      <AnnouncementBoard role="Admin" canCreate />
    </div>
  );
};

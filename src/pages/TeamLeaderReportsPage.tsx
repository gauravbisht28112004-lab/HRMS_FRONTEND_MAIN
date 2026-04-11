import { useMemo } from 'react';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { employees, performanceMetrics } from '@/constants/mockData';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency } from '@/utils/format';

export const TeamLeaderReportsPage = () => {
  const user = useAuthStore((state) => state.user);
  const teamMembers = useMemo(() => employees.filter((item) => item.teamLeader === user?.name), [user]);
  const teamReports = useMemo(() => performanceMetrics.filter((item) => item.teamLeader === user?.name), [user]);

  return (
    <div className="space-y-6">
      <PageHeader title="Team Reports" description="View reports for your own team members only." />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-slate-200 bg-white shadow-none">
          <p className="text-sm text-slate-500">Team Members</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{teamMembers.length}</p>
        </Card>
        <Card className="border border-slate-200 bg-white shadow-none">
          <p className="text-sm text-slate-500">Submitted Reports</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{teamReports.filter((item) => item.dailyReportingStatus === 'Submitted').length}</p>
        </Card>
        <Card className="border border-slate-200 bg-white shadow-none">
          <p className="text-sm text-slate-500">Total Disbursal</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{formatCurrency(teamReports.reduce((sum, item) => sum + item.disbursalAmount, 0))}</p>
        </Card>
      </div>

      <DataTable
        data={teamReports}
        columns={[
          { key: 'employee', header: 'Employee', render: (item) => item.employeeName },
          { key: 'month', header: 'Month Completion', render: (item) => `${item.monthCompletion}%` },
          { key: 'productivity', header: 'Productivity', render: (item) => `${item.productivityScore}%` },
          { key: 'attendance', header: 'Attendance', render: (item) => `${item.attendanceScore}%` },
          { key: 'disbursal', header: 'Disbursal', render: (item) => formatCurrency(item.disbursalAmount) },
          { key: 'report', header: 'Daily Report', render: (item) => item.dailyReportingStatus },
        ]}
      />
    </div>
  );
};

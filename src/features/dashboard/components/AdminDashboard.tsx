import { Activity, IndianRupee, Megaphone, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { Card } from '@/components/ui/Card';
import { announcements, performanceMetrics } from '@/constants/mockData';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/services/api';
import { formatCurrency } from '@/utils/format';
import { AnnouncementBoard } from './AnnouncementBoard';

/**
 * Admin home dashboard. Headcount + payroll KPIs come from
 * `/api/dashboard/stats`. The performance metrics table and announcement
 * board still source from local state / mock data — those have their own
 * follow-up tasks (analytics rollup + announcements API).
 *
 * <p>The org-wide monthly goal tile is now backed by `system_config` via
 * `api.systemConfig.getOrgMonthlyGoal` / `setOrgMonthlyGoal` (Q5, V13).
 * The "Publish Monthly Target" form below calls the Admin-only PUT and
 * invalidates the query so every other dashboard reading the same value
 * refreshes on next focus.
 */
export const AdminDashboard = () => {
  const queryClient = useQueryClient();

  const { data: monthlyGoal } = useQuery({
    queryKey: ['org-monthly-goal'],
    queryFn: api.systemConfig.getOrgMonthlyGoal,
    staleTime: 60_000,
  });
  const monthlyTargetAmount = monthlyGoal?.amount ?? 0;
  const [draftTarget, setDraftTarget] = useState('0');

  // Sync the input with the persisted value on first load and after a save.
  useEffect(() => {
    setDraftTarget(String(monthlyTargetAmount));
  }, [monthlyTargetAmount]);

  const setGoalMutation = useMutation({
    mutationFn: (amount: number) => api.systemConfig.setOrgMonthlyGoal(amount),
    onSuccess: () => {
      // Refresh the value across every dashboard reading the same query key.
      queryClient.invalidateQueries({ queryKey: ['org-monthly-goal'] });
    },
  });

  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: api.dashboard.stats,
    refetchOnWindowFocus: true,
    staleTime: 30_000,
  });

  const fmt = (n?: number) => (isLoading ? '—' : String(n ?? 0));
  const activeEmployees = stats?.activeEmployees ?? 0;
  const totalEmployees = stats?.totalEmployees ?? 0;
  const newThisMonth = stats?.newEmployeesThisMonth ?? 0;
  const submittedReports = performanceMetrics.filter(
    (item) => item.dailyReportingStatus === 'Submitted',
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Command Dashboard"
        description="Publish org-wide announcements, monitor workforce performance, and set the monthly amount target for all business dashboards."
      />

      {isError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Couldn&apos;t load dashboard stats:{' '}
          {(error as Error)?.message || 'unknown error'}.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Active Employees"
          value={fmt(activeEmployees)}
          meta={
            isLoading
              ? 'Loading…'
              : `${totalEmployees} on rolls · ${newThisMonth} joined this month`
          }
          icon={<Users size={22} />}
        />
        <StatsCard
          label="Live Announcements"
          value={String(announcements.length)}
          meta="Visible across dashboards"
          icon={<Megaphone size={22} />}
        />
        <StatsCard
          label="Monthly Target"
          value={formatCurrency(monthlyTargetAmount)}
          meta="Set by admin in rupees"
          icon={<IndianRupee size={22} />}
        />
        <StatsCard
          label="Daily Reports"
          value={`${submittedReports}/${performanceMetrics.length}`}
          meta="Submission compliance today"
          icon={<Activity size={22} />}
        />
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
            <Button
              onClick={() => setGoalMutation.mutate(Number(draftTarget) || 0)}
              disabled={setGoalMutation.isPending}
            >
              {setGoalMutation.isPending ? 'Publishing…' : 'Publish Monthly Target'}
            </Button>
            {setGoalMutation.isError ? (
              <p className="text-xs text-rose-600">
                Could not save: {(setGoalMutation.error as Error)?.message ?? 'try again'}
              </p>
            ) : null}
          </div>
        </Card>
      </div>

      <AnnouncementBoard role="Admin" canCreate />
    </div>
  );
};

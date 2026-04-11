import { Trophy } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { employees, performanceMetrics } from '@/constants/mockData';
import { formatCurrency, getInitials } from '@/utils/format';

export const LeaderboardPage = () => {
  const rows = performanceMetrics
    .map((metric) => {
      const employee = employees.find((item) => item.id === metric.employeeId);

      return {
        ...metric,
        profilePicture: employee?.profilePicture,
      };
    })
    .sort((a, b) => b.disbursalAmount - a.disbursalAmount);

  return (
    <div className="space-y-6">
      <PageHeader title="Disbursal Leaderboard" description="Compare employee disbursal performance across the organization." />

      <Card className="border border-slate-200 bg-white shadow-none">
        <div className="space-y-4">
          {rows.map((item, index) => (
            <div key={item.employeeId} className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 font-semibold text-white">
                  {item.profilePicture ? (
                    <img src={item.profilePicture} alt={item.employeeName} className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    getInitials(item.employeeName)
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    #{index + 1} {item.employeeName}
                  </p>
                  <p className="text-sm text-slate-500">Team Leader: {item.teamLeader}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                <div className="rounded-xl bg-brand-50 p-2 text-brand-700">
                  <Trophy size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Disbursal Amount</p>
                  <p className="text-lg font-semibold text-slate-900">{formatCurrency(item.disbursalAmount)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

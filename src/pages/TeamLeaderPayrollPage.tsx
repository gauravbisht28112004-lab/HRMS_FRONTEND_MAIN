import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { payrollEntries } from '@/constants/mockData';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency } from '@/utils/format';

export const TeamLeaderPayrollPage = () => {
  const user = useAuthStore((state) => state.user);
  const payroll = payrollEntries.find((item) => item.employeeName === user?.name);

  if (!payroll) {
    return <div className="text-sm text-slate-500">Payroll details are unavailable for this team leader account.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="My Payroll" description="Read-only payroll details for the signed-in team leader account." />
      <Card className="border border-slate-200 bg-white shadow-none">
        <div className="grid gap-4 md:grid-cols-2">
          <Detail label="Employee" value={payroll.employeeName} />
          <Detail label="Department" value={payroll.department} />
          <Detail label="Salary Structure" value={payroll.salaryStructure} />
          <Detail label="Month" value={payroll.month} />
          <Detail label="Gross Earnings" value={formatCurrency(payroll.earnings)} />
          <Detail label="Deductions" value={formatCurrency(payroll.deductions)} />
          <Detail label="Net Salary" value={formatCurrency(payroll.netSalary)} />
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Status</p>
            <div className="mt-2">
              <StatusBadge label={payroll.status} tone={payroll.status === 'Processed' ? 'success' : 'warning'} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-slate-50 p-4">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 font-medium text-slate-900">{value}</p>
  </div>
);

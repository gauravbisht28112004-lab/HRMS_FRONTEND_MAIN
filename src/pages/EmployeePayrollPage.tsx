import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { employees, payrollEntries } from '@/constants/mockData';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency } from '@/utils/format';

export const EmployeePayrollPage = () => {
  const user = useAuthStore((state) => state.user);
  const employee = employees.find((item) => item.id === user?.employeeId);
  const employeeName = `${employee?.firstName ?? ''} ${employee?.lastName ?? ''}`.trim();
  const payroll = payrollEntries.find((item) => item.employeeName === employeeName);

  if (!employee || !payroll) {
    return <div className="text-sm text-slate-500">Payroll details are unavailable for this employee account.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="My Payroll" description="Read-only salary structure and payroll summary for your own account." />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className="border border-slate-200 bg-white shadow-none">
          <h3 className="text-lg font-semibold text-slate-900">Salary Structure</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Detail label="Employee" value={employeeName} />
            <Detail label="Department" value={employee.department} />
            <Detail label="Salary Structure" value={payroll.salaryStructure} />
            <Detail label="Bank Details" value={employee.bankDetails} />
            <Detail label="Month" value={payroll.month} />
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Payroll Status</p>
              <div className="mt-2">
                <StatusBadge label={payroll.status} tone={payroll.status === 'Processed' ? 'success' : 'warning'} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-none">
          <h3 className="text-lg font-semibold text-slate-900">Salary Summary</h3>
          <div className="mt-5 space-y-4">
            <Detail label="Gross Earnings" value={formatCurrency(payroll.earnings)} />
            <Detail label="Deductions" value={formatCurrency(payroll.deductions)} />
            <Detail label="Net Salary" value={formatCurrency(payroll.netSalary)} />
            <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-800">
              Employees can view payroll details here, but payroll edits remain restricted to HR only.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-slate-50 p-4">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 font-medium text-slate-900">{value}</p>
  </div>
);

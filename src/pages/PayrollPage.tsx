import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/common/DataTable';
import { FilterBar } from '@/components/common/FilterBar';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Select } from '@/components/ui/Select';
import { PayslipPreview } from '@/features/payroll/components/PayslipPreview';
import { api } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency } from '@/utils/format';

export const PayrollPage = () => {
  const { data = [] } = useQuery({ queryKey: ['payroll'], queryFn: api.payroll.list });
  const user = useAuthStore((state) => state.user);
  const [month, setMonth] = useState('April 2026');
  const [department, setDepartment] = useState('All');
  const canEditPayroll = user?.role === 'HR';

  const filtered = useMemo(
    () =>
      data.filter(
        (item) =>
          item.month === month &&
          (department === 'All' || item.department === department) &&
          item.employeeName !== 'Rohan Mehta',
      ),
    [data, department, month],
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Payroll Operations" description="Salary structures, monthly runs, earnings, deductions, and downloadable payslips." />

      <FilterBar>
        <Select
          label="Month"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          options={[
            { label: 'April 2026', value: 'April 2026' },
            { label: 'March 2026', value: 'March 2026' },
          ]}
        />
        <Select
          label="Department"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          options={[
            { label: 'All Departments', value: 'All' },
            { label: 'Finance', value: 'Finance' },
            { label: 'Engineering', value: 'Engineering' },
          ]}
        />
      </FilterBar>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <DataTable
          data={filtered}
          columns={[
            { key: 'employee', header: 'Employee', render: (entry) => entry.employeeName },
            { key: 'department', header: 'Department', render: (entry) => entry.department },
            { key: 'structure', header: 'Salary Structure', render: (entry) => entry.salaryStructure },
            { key: 'earnings', header: 'Earnings', render: (entry) => formatCurrency(entry.earnings) },
            { key: 'deductions', header: 'Deductions', render: (entry) => formatCurrency(entry.deductions) },
            { key: 'net', header: 'Net Salary', render: (entry) => formatCurrency(entry.netSalary) },
            {
              key: 'status',
              header: 'Status',
              render: (entry) => <StatusBadge label={entry.status} tone={entry.status === 'Processed' ? 'success' : 'warning'} />,
            },
            {
              key: 'actions',
              header: 'Actions',
              render: () =>
                canEditPayroll ? (
                  <Button variant="secondary">Edit Payroll</Button>
                ) : (
                  <span className="text-sm text-slate-500">Payroll editing restricted to HR</span>
                ),
            },
          ]}
        />

        {filtered[0] ? <PayslipPreview entry={filtered[0]} /> : null}
      </div>
    </div>
  );
};

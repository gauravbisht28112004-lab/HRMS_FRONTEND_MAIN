import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { ShiftForm } from '@/features/shifts/components/ShiftForm';
import { api } from '@/services/api';

export const ShiftsPage = () => {
  const { data = [] } = useQuery({ queryKey: ['shifts'], queryFn: api.shifts.list });

  return (
    <div className="space-y-6">
      <PageHeader title="Shift Management" description="Define shift policies, grace periods, overtime rules, and employee assignments." />
      <ShiftForm />
      <DataTable
        data={data}
        columns={[
          { key: 'name', header: 'Shift', render: (shift) => shift.name },
          { key: 'hours', header: 'Hours', render: (shift) => `${shift.startTime} - ${shift.endTime}` },
          { key: 'break', header: 'Break', render: (shift) => shift.breakTime },
          { key: 'grace', header: 'Grace Period', render: (shift) => shift.gracePeriod },
          { key: 'weeklyOff', header: 'Weekly Off', render: (shift) => shift.weeklyOff },
          { key: 'overtime', header: 'Overtime Rule', render: (shift) => shift.overtimeRule },
          { key: 'assigned', header: 'Assigned Employees', render: (shift) => shift.assignedEmployees.join(', ') },
        ]}
      />
    </div>
  );
};

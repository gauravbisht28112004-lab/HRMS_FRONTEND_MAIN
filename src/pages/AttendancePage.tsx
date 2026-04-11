import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/common/DataTable';
import { FilterBar } from '@/components/common/FilterBar';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { AttendanceSummary } from '@/features/attendance/components/AttendanceSummary';
import { api } from '@/services/api';
import { employees } from '@/constants/mockData';
import { useAuthStore } from '@/store/authStore';

export const AttendancePage = () => {
  const { data = [] } = useQuery({ queryKey: ['attendance'], queryFn: api.attendance.list });
  const user = useAuthStore((state) => state.user);
  const [date, setDate] = useState('2026-04-07');
  const [employee, setEmployee] = useState('All');
  const isEmployee = user?.role === 'Employee';
  const canRegularizeAttendance = user?.role === 'Admin' || user?.role === 'HR';

  const accessibleNames = useMemo(() => {
    if (user?.role !== 'Team Leader') return data.map((record) => record.employeeName);
    return employees.filter((item) => item.teamLeader === user.name).map((item) => `${item.firstName} ${item.lastName}`);
  }, [data, user]);

  const employeeOptions = useMemo(
    () => [{ label: 'All Employees', value: 'All' }, ...accessibleNames.map((name) => ({ label: name, value: name }))],
    [accessibleNames],
  );

  const filtered = useMemo(
    () =>
      data.filter(
        (record) =>
          record.date === date &&
          accessibleNames.includes(record.employeeName) &&
          (employee === 'All' || record.employeeName === employee),
      ),
    [accessibleNames, data, date, employee],
  );

  if (isEmployee) {
    const currentEmployeeName = `${employees.find((item) => item.id === user.employeeId)?.firstName ?? ''} ${
      employees.find((item) => item.id === user.employeeId)?.lastName ?? ''
    }`.trim();
    const employeeAttendance = data.filter((record) => record.employeeName === currentEmployeeName);

    return (
      <div className="space-y-6">
        <PageHeader title="Attendance Dashboard" description="Check fingerprint-based attendance updates." />

        <Card className="border border-slate-200 bg-white shadow-none">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Fingerprint</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">Verified</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Punch In</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{employeeAttendance[0]?.punchIn ?? '--'}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Punch Out</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{employeeAttendance[0]?.punchOut ?? '--'}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Working Hours</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{employeeAttendance[0]?.workingHours ?? '--'}</p>
            </div>
          </div>
        </Card>

        <DataTable
          data={employeeAttendance}
          columns={[
            { key: 'date', header: 'Date', render: (record) => record.date },
            { key: 'fingerprint', header: 'Fingerprint', render: () => <StatusBadge label="Verified" tone="success" /> },
            { key: 'punchIn', header: 'Punch In', render: (record) => record.punchIn },
            { key: 'punchOut', header: 'Punch Out', render: (record) => record.punchOut },
            { key: 'hours', header: 'Working Hours', render: (record) => record.workingHours },
          ]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Operations"
        description="Monitor punch records, missing entries, late arrivals, early exits, and overtime eligibility."
      />

      <AttendanceSummary records={filtered} />

      <FilterBar>
        <Input label="Attendance Date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <Select
          label="Employee"
          value={employee}
          onChange={(event) => setEmployee(event.target.value)}
          options={employeeOptions}
        />
        <div className="flex items-end text-sm text-slate-500">Color-coded flags identify risk records at a glance.</div>
      </FilterBar>

      <DataTable
        data={filtered}
        columns={[
          { key: 'employee', header: 'Employee', render: (record) => record.employeeName },
          { key: 'department', header: 'Department', render: (record) => record.department },
          { key: 'punchIn', header: 'Punch In', render: (record) => record.punchIn },
          { key: 'punchOut', header: 'Punch Out', render: (record) => record.punchOut },
          { key: 'hours', header: 'Working Hours', render: (record) => record.workingHours },
          {
            key: 'indicators',
            header: 'Indicators',
            render: (record) => (
              <div className="flex flex-wrap gap-2">
                {record.late ? <StatusBadge label="Late" tone="warning" /> : null}
                {record.earlyExit ? <StatusBadge label="Early Exit" tone="danger" /> : null}
                {record.missingPunch ? <StatusBadge label="Missing Punch" tone="danger" /> : null}
                {record.overtimeHours > 0 ? <StatusBadge label={`OT ${record.overtimeHours}h`} tone="info" /> : null}
              </div>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (record) => (
              <StatusBadge label={record.status} tone={record.status === 'Present' ? 'success' : record.status === 'Absent' ? 'danger' : 'info'} />
            ),
          },
          ...(canRegularizeAttendance
            ? [
                {
                  key: 'regularize',
                  header: 'Regularize',
                  render: (record: (typeof filtered)[number]) => (
                    <button className="rounded-xl bg-brand-700 px-3 py-2 text-xs font-medium text-white hover:bg-brand-800">
                      Regularize {record.employeeName.split(' ')[0]}
                    </button>
                  ),
                },
              ]
            : []),
        ]}
      />
    </div>
  );
};

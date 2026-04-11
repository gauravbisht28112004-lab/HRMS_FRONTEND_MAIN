import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { DataTable } from '@/components/common/DataTable';
import { FilterBar } from '@/components/common/FilterBar';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { EmployeeForm } from '@/features/employee/components/EmployeeForm';
import { api } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { Employee } from '@/types';

export const EmployeesPage = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useQuery({ queryKey: ['employees'], queryFn: api.employees.list });
  const user = useAuthStore((state) => state.user);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [shift, setShift] = useState('All');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  const filtered = useMemo(
    () =>
      data.filter((employee) => {
        const withinScope = user?.role !== 'Team Leader' || employee.teamLeader === user.name;
        const matchesSearch = `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(search.toLowerCase());
        const matchesDepartment = department === 'All' || employee.department === department;
        const matchesShift = shift === 'All' || employee.shiftAssignment === shift;
        return withinScope && matchesSearch && matchesDepartment && matchesShift;
      }),
    [data, department, search, shift, user],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Management"
        description={
          user?.role === 'Team Leader'
            ? 'View and manage only your team members.'
            : 'Create, edit, search, filter, and audit employee records with an API-ready workflow.'
        }
        action={user?.role === 'Team Leader' ? undefined : <Button onClick={() => setEditingEmployee(null)}>Add Employee</Button>}
      />

      <EmployeeForm initialValues={editingEmployee ?? undefined} />

      <FilterBar>
        <Input placeholder="Search employee" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          options={[
            { label: 'All Departments', value: 'All' },
            { label: 'Finance', value: 'Finance' },
            { label: 'Engineering', value: 'Engineering' },
            { label: 'HR', value: 'HR' },
          ]}
        />
        <Select
          value={shift}
          onChange={(event) => setShift(event.target.value)}
          options={[
            { label: 'All Shifts', value: 'All' },
            { label: 'General Shift', value: 'General Shift' },
            { label: 'Flex Shift', value: 'Flex Shift' },
          ]}
        />
        <div className="flex items-center justify-end text-sm text-slate-500">Showing {filtered.length} employees</div>
      </FilterBar>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <DataTable
          data={filtered}
          columns={[
            {
              key: 'name',
              header: 'Employee',
              render: (employee) => (
                <button className="font-medium text-brand-700" onClick={() => navigate(`/employees/${employee.id}`)}>
                  {employee.firstName} {employee.lastName}
                </button>
              ),
            },
            { key: 'employeeId', header: 'Employee ID', render: (employee) => employee.id },
            { key: 'department', header: 'Department', render: (employee) => employee.department },
            { key: 'shift', header: 'Shift', render: (employee) => employee.shiftAssignment },
            { key: 'teamLeader', header: 'Team Leader', render: (employee) => employee.teamLeader },
            {
              key: 'status',
              header: 'Status',
              render: (employee) => (
                <StatusBadge
                  label={employee.status}
                  tone={employee.status === 'Active' ? 'success' : employee.status === 'On Leave' ? 'warning' : 'danger'}
                />
              ),
            },
            {
              key: 'actions',
              header: 'Actions',
              render: (employee) => (
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => setEditingEmployee(employee)}>
                    Edit
                  </Button>
                  <Button variant="ghost" onClick={() => navigate(`/employees/${employee.id}`)}>
                    View
                  </Button>
                  <button className="rounded-lg p-2 text-rose-600 hover:bg-rose-50" onClick={() => setDeleteTarget(employee)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
        <span>Page 1 of 3</span>
        <div className="flex gap-2">
          <Button variant="secondary">Previous</Button>
          <Button variant="secondary">Next</Button>
        </div>
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete employee record?"
        description={`This confirms deletion for ${deleteTarget?.firstName ?? 'the selected employee'}. Replace with API mutation in production.`}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => setDeleteTarget(null)}
        confirmLabel="Delete"
      />
    </div>
  );
};

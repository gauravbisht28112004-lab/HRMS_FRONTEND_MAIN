import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { DepartmentForm } from '@/features/departments/components/DepartmentForm';
import { api } from '@/services/api';
import { mapDepartmentFormToRequest, type DepartmentFormValues } from '@/services/requestMappers';

export const DepartmentsPage = () => {
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ['departments'], queryFn: api.departments.list });
  const { data: employees = [] } = useQuery({ queryKey: ['department-managers'], queryFn: api.employees.list });

  const createDepartmentMutation = useMutation({
    mutationFn: (values: DepartmentFormValues) => api.departments.create(mapDepartmentFormToRequest(values)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const managerOptions = [
    { label: 'Select team leader', value: '' },
    ...employees.map((employee) => ({
      label: `${employee.firstName} ${employee.lastName}`,
      value: String(employee.backendId ?? ''),
    })),
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Department Management" description="Create departments, assign team leaders, and track headcount distribution." />
      <DepartmentForm
        onSubmit={(values) => createDepartmentMutation.mutateAsync(values)}
        isSubmitting={createDepartmentMutation.isPending}
        managerOptions={managerOptions}
      />
      <DataTable
        data={data}
        columns={[
          { key: 'name', header: 'Department', render: (department) => department.name },
          { key: 'teamLeader', header: 'Team Leader', render: (department) => department.teamLeader },
          { key: 'employees', header: 'Employees', render: (department) => department.totalEmployees },
        ]}
      />
    </div>
  );
};

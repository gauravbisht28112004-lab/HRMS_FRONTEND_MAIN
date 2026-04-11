import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { DepartmentForm } from '@/features/departments/components/DepartmentForm';
import { api } from '@/services/api';

export const DepartmentsPage = () => {
  const { data = [] } = useQuery({ queryKey: ['departments'], queryFn: api.departments.list });

  return (
    <div className="space-y-6">
      <PageHeader title="Department Management" description="Create departments, assign team leaders, and track headcount distribution." />
      <DepartmentForm />
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

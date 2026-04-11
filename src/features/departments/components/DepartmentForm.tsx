import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export const DepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [teamLeader, setTeamLeader] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.alert(`Department payload ready:\n${JSON.stringify({ departmentName, teamLeader }, null, 2)}`);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <Input label="Department Name" value={departmentName} onChange={(event) => setDepartmentName(event.target.value)} />
        <Input label="Assign Team Leader" value={teamLeader} onChange={(event) => setTeamLeader(event.target.value)} />
        <div className="md:col-span-2 flex justify-end">
          <Button type="submit">Create Department</Button>
        </div>
      </form>
    </Card>
  );
};

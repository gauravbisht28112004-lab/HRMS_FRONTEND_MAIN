import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export const ShiftForm = () => {
  const [form, setForm] = useState({
    name: '',
    startTime: '',
    endTime: '',
    breakTime: '',
    gracePeriod: '',
    weeklyOff: '',
    overtimeRule: '',
    assignedEmployees: '',
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.alert(`Shift ready for API submit:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <Card>
      <form className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" onSubmit={handleSubmit}>
        <Input label="Shift Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Start Time" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
        <Input label="End Time" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
        <Input label="Break Time" type="time" value={form.breakTime} onChange={(e) => setForm({ ...form, breakTime: e.target.value })} />
        <Input label="Grace Period" value={form.gracePeriod} onChange={(e) => setForm({ ...form, gracePeriod: e.target.value })} />
        <Input label="Weekly Off" value={form.weeklyOff} onChange={(e) => setForm({ ...form, weeklyOff: e.target.value })} />
        <Input label="Overtime Rule" value={form.overtimeRule} onChange={(e) => setForm({ ...form, overtimeRule: e.target.value })} />
        <Input
          label="Assign Employees"
          value={form.assignedEmployees}
          onChange={(e) => setForm({ ...form, assignedEmployees: e.target.value })}
          placeholder="Comma-separated names"
        />
        <div className="md:col-span-2 xl:col-span-4 flex justify-end">
          <Button type="submit">Save Shift</Button>
        </div>
      </form>
    </Card>
  );
};

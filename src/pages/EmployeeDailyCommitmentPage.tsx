import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { goalProgressEntries } from '@/constants/mockData';
import { useAuthStore } from '@/store/authStore';

export const EmployeeDailyCommitmentPage = () => {
  const user = useAuthStore((state) => state.user);
  const goal = goalProgressEntries.find((item) => item.employeeId === user?.employeeId);
  const [form, setForm] = useState({
    calls: '50',
    otp: '10',
    customers: '5',
    disbursal: '50000',
  });

  if (!goal) {
    return <div className="text-sm text-slate-500">Daily commitment is unavailable for this account.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Daily Commitment</h1>
        <p className="mt-1 text-sm text-slate-500">Set your daily goals and targets</p>
      </div>

      <Card className="border border-slate-200 bg-white shadow-none">
        <h3 className="text-xl font-semibold text-slate-900">Set Today&apos;s Commitment</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input label="Target Calls" type="number" placeholder="e.g., 50" value={form.calls} onChange={(event) => setForm({ ...form, calls: event.target.value })} />
          <Input label="Target OTP" type="number" placeholder="e.g., 10" value={form.otp} onChange={(event) => setForm({ ...form, otp: event.target.value })} />
          <Input
            label="Target Interested Customers"
            type="number"
            placeholder="e.g., 5"
            value={form.customers}
            onChange={(event) => setForm({ ...form, customers: event.target.value })}
          />
          <Input
            label="Target Disbursal (₹)"
            type="number"
            placeholder="e.g., 50000"
            value={form.disbursal}
            onChange={(event) => setForm({ ...form, disbursal: event.target.value })}
          />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button className="bg-[#5b6957] hover:bg-[#4f5c4c]">Set Commitment</Button>
          <p className="text-sm text-slate-500">This block is editable by the employee for the day.</p>
        </div>
      </Card>

      <Card className="border border-slate-200 bg-white shadow-none">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-[#f8f8f4] p-4">
            <p className="text-sm text-slate-500">Daily Commitment</p>
            <p className="mt-2 font-medium text-slate-900">{goal.dailyCommitment}</p>
          </div>
          <div className="rounded-2xl bg-[#f8f8f4] p-4">
            <p className="text-sm text-slate-500">Monthly Target</p>
            <p className="mt-2 font-medium text-slate-900">{goal.monthlyTarget}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

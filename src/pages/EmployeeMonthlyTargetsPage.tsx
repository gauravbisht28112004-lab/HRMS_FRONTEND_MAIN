import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { goalProgressEntries } from '@/constants/mockData';

export const EmployeeMonthlyTargetsPage = () => {
  const user = useAuthStore((state) => state.user);
  const goal = goalProgressEntries.find((item) => item.employeeId === user?.employeeId);
  const [form, setForm] = useState({
    amount: String(goal?.monthlyTotal ?? 0),
    logins: String(goal?.monthlyCompleted ?? 0),
    note: goal?.monthlyTarget ?? '',
  });

  if (!goal) return <div className="text-sm text-slate-500">Monthly targets are unavailable for this account.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Monthly Targets</h1>
        <p className="mt-1 text-sm text-slate-500">View your monthly performance goals</p>
      </div>

      <Card className="border border-slate-200 bg-white shadow-none">
        <div className="rounded-2xl bg-[#f8f7f2] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xl font-semibold text-slate-900">April 2026</p>
              <p className="text-sm text-slate-500">Monthly Performance Target</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card className="border border-slate-200 bg-white shadow-none">
              <p className="text-sm text-slate-500">Target Amount</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">₹{form.amount}</p>
              <p className="mt-2 text-sm text-slate-500">Monthly disbursal goal</p>
            </Card>
            <Card className="border border-slate-200 bg-white shadow-none">
              <p className="text-sm text-slate-500">Target Logins</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{form.logins}</p>
              <p className="mt-2 text-sm text-slate-500">Total login target</p>
            </Card>
          </div>

          <div className="mt-5">
            <Input label="Monthly Target Note" value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button className="bg-[#5b6957] hover:bg-[#4f5c4c]">Save Monthly Target</Button>
            <div className="rounded-2xl bg-[#fcf6e8] px-4 py-3 text-sm text-[#8f7a47]">
              No targets set for this month. Please contact your admin.
            </div>
          </div>
        </div>
      </Card>

      <Card className="border border-slate-200 bg-white shadow-none">
        <h3 className="text-xl font-semibold text-slate-900">Target Achievement Tips</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Set daily commitments to break down monthly goals into achievable targets</li>
          <li>Track hourly updates to monitor progress throughout the day</li>
          <li>Check leaderboard regularly to stay motivated and competitive</li>
          <li>Review dashboard metrics daily to identify areas for improvement</li>
        </ul>
      </Card>
    </div>
  );
};

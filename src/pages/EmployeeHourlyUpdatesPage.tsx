import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { useAuthStore } from '@/store/authStore';

type HourlyUpdate = {
  id: string;
  date: string;
  hourSlot: string;
  callsDone: string;
  otpAchieved: string;
  interestedCustomers: string;
  status: 'Submitted' | 'Pending';
};

export const EmployeeHourlyUpdatesPage = () => {
  const user = useAuthStore((state) => state.user);
  const [draft, setDraft] = useState({ hourSlot: '', callsDone: '', otpAchieved: '', interestedCustomers: '' });
  const [localLogs, setLocalLogs] = useState<HourlyUpdate[]>([]);

  const submitUpdate = () => {
    if (!draft.hourSlot || !draft.callsDone || !draft.otpAchieved || !draft.interestedCustomers) return;

    setLocalLogs((prev) => [
      {
        id: crypto.randomUUID(),
        date: '2026-04-08',
        hourSlot: draft.hourSlot,
        callsDone: draft.callsDone,
        otpAchieved: draft.otpAchieved,
        interestedCustomers: draft.interestedCustomers,
        status: 'Submitted',
      },
      ...prev,
    ]);
    setDraft({ hourSlot: '', callsDone: '', otpAchieved: '', interestedCustomers: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Hourly Updates</h1>
        <p className="mt-1 text-sm text-slate-500">Track calls done, OTP achieved, and interested customers for each hour.</p>
      </div>

      <Card className="border border-slate-200 bg-white shadow-none">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Hour Slot"
            placeholder="10:00 - 11:00"
            value={draft.hourSlot}
            onChange={(event) => setDraft({ ...draft, hourSlot: event.target.value })}
          />
          <Input
            label="Calls Done"
            type="number"
            placeholder="e.g., 20"
            value={draft.callsDone}
            onChange={(event) => setDraft({ ...draft, callsDone: event.target.value })}
          />
          <Input
            label="OTP Achieved"
            type="number"
            placeholder="e.g., 6"
            value={draft.otpAchieved}
            onChange={(event) => setDraft({ ...draft, otpAchieved: event.target.value })}
          />
          <Input
            label="Interested Customers"
            type="number"
            placeholder="e.g., 3"
            value={draft.interestedCustomers}
            onChange={(event) => setDraft({ ...draft, interestedCustomers: event.target.value })}
          />
        </div>
        <div className="mt-5 flex justify-end">
          <Button className="bg-[#5b6957] hover:bg-[#4f5c4c]" onClick={submitUpdate}>
            Submit Hourly Update
          </Button>
        </div>
      </Card>

      <DataTable
        data={localLogs}
        columns={[
          { key: 'date', header: 'Date', render: (item) => item.date },
          { key: 'hour', header: 'Hour Slot', render: (item) => item.hourSlot },
          { key: 'calls', header: 'Calls Done', render: (item) => item.callsDone },
          { key: 'otp', header: 'OTP Achieved', render: (item) => item.otpAchieved },
          { key: 'customers', header: 'Interested Customers', render: (item) => item.interestedCustomers },
          {
            key: 'status',
            header: 'Status',
            render: (item) => <StatusBadge label={item.status} tone={item.status === 'Submitted' ? 'success' : 'warning'} />,
          },
        ]}
      />
    </div>
  );
};

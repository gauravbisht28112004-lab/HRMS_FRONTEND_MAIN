import { FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { LeaveCalendar } from '@/features/leave/components/LeaveCalendar';
import { api } from '@/services/api';
import { useAuthStore } from '@/store/authStore';

export const LeavePage = () => {
  const { data = [] } = useQuery({ queryKey: ['leave'], queryFn: api.leave.list });
  const user = useAuthStore((state) => state.user);
  const [form, setForm] = useState({ leaveType: '', from: '', to: '', reason: '' });
  const canApproveLeave = user?.role === 'Admin' || user?.role === 'HR';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.alert(`Leave request ready for API submit:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Leave Management" description="Apply for leave, review balances, and manage approval queues." />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">Apply Leave</h3>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <Input label="Leave Type" value={form.leaveType} onChange={(e) => setForm({ ...form, leaveType: e.target.value })} />
            <Input label="From" type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
            <Input label="To" type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              <span>Reason</span>
              <textarea
                rows={4}
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />
            </label>
            <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-800">
              Leave Balance: Casual 8 days • Sick 5 days • Privilege 12 days
            </div>
            <Button type="submit">Submit Request</Button>
          </form>
        </Card>

        <LeaveCalendar requests={data} />
      </div>

      <DataTable
        data={data}
        columns={[
          { key: 'employee', header: 'Employee', render: (request) => request.employeeName },
          { key: 'type', header: 'Type', render: (request) => request.leaveType },
          { key: 'period', header: 'Period', render: (request) => `${request.from} to ${request.to}` },
          { key: 'days', header: 'Days', render: (request) => request.days },
          {
            key: 'status',
            header: 'Status',
            render: (request) => (
              <StatusBadge
                label={request.status}
                tone={request.status === 'Approved' ? 'success' : request.status === 'Rejected' ? 'danger' : 'warning'}
              />
            ),
          },
          {
            key: 'approval',
            header: 'Approval',
            render: (request) => (
              canApproveLeave ? (
                <div className="flex gap-2">
                  <Button variant="secondary">Approve</Button>
                  <Button variant="ghost">Reject</Button>
                </div>
              ) : (
                <span className="text-sm text-slate-500">Approval restricted to Admin and HR</span>
              )
            ),
          },
        ]}
      />
    </div>
  );
};

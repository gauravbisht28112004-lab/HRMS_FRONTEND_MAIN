import { Clock3, Landmark, PlaneTakeoff, Users } from 'lucide-react';
import { attendanceRecords, employees, leaveRequests, payrollEntries } from '@/constants/mockData';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { Card } from '@/components/ui/Card';
import { AnnouncementBoard } from './AnnouncementBoard';

export const HRDashboard = () => (
  <div className="space-y-6">
    <PageHeader title="HR Operations Dashboard" description="Operational view across headcount, attendance, leave, compliance, and payroll for Finbud Financial." />

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard label="Total Employees" value={String(employees.length)} meta="Across all departments" icon={<Users size={22} />} />
      <StatsCard label="Present Today" value={String(attendanceRecords.filter((item) => item.status === 'Present').length)} meta="Attendance sync complete" icon={<Clock3 size={22} />} />
      <StatsCard label="Pending Leave" value={String(leaveRequests.filter((item) => item.status === 'Pending').length)} meta="Needs HR action" icon={<PlaneTakeoff size={22} />} />
      <StatsCard label="Processed Payroll" value={String(payrollEntries.filter((item) => item.status === 'Processed').length)} meta="Current payroll cycle" icon={<Landmark size={22} />} />
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card>
        <h3 className="text-lg font-semibold text-slate-900">HR Priorities</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-brand-50 p-4">
            <p className="text-sm text-brand-700">Attendance</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">2 late arrivals</p>
          </div>
          <div className="rounded-2xl bg-accent-50 p-4">
            <p className="text-sm text-accent-700">Payroll</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">3 salaries staged</p>
          </div>
          <div className="rounded-2xl bg-sky-50 p-4">
            <p className="text-sm text-sky-700">Leave</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">1 request pending</p>
          </div>
        </div>
      </Card>
      <AnnouncementBoard role="HR" />
    </div>
  </div>
);

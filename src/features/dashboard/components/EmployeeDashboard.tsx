import { Card } from '@/components/ui/Card';
import { AnnouncementBoard } from './AnnouncementBoard';
import { announcements, employees, goalProgressEntries, payrollEntries } from '@/constants/mockData';
import { useAuthStore } from '@/store/authStore';
import { useAdminStore } from '@/store/adminStore';
import { formatCurrency } from '@/utils/format';

const percent = (done: number, total: number) => `${Math.round((done / Math.max(total, 1)) * 100)}%`;

export const EmployeeDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const adminMonthlyTargetAmount = useAdminStore((state) => state.monthlyTargetAmount);
  const employee = employees.find((item) => item.id === user?.employeeId);
  const goal = goalProgressEntries.find((item) => item.employeeId === user?.employeeId);
  const payroll = payrollEntries.find((item) => item.employeeName === `${employee?.firstName ?? ''} ${employee?.lastName ?? ''}`.trim());
  const announcementCount = announcements.filter((item) => item.audience.includes('Employee')).length;

  if (!employee || !goal) {
    return <div className="text-sm text-slate-500">Employee dashboard is unavailable for this account.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Employee Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Your overview, personal details, and live progress at a glance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border border-slate-200 bg-white shadow-none">
          <p className="text-sm text-slate-500">Daily Commitment</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{percent(goal.dailyCompleted, goal.dailyTotal)}</p>
          <p className="mt-2 text-sm text-slate-500">{goal.dailyCommitment}</p>
        </Card>
        <Card className="border border-slate-200 bg-white shadow-none">
          <p className="text-sm text-slate-500">Monthly Target</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{percent(goal.monthlyCompleted, goal.monthlyTotal)}</p>
          <p className="mt-2 text-sm text-slate-500">{goal.monthlyTarget}</p>
        </Card>
        <Card className="border border-slate-200 bg-white shadow-none">
          <p className="text-sm text-slate-500">Admin Monthly Goal</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{formatCurrency(adminMonthlyTargetAmount)}</p>
          <p className="mt-2 text-sm text-slate-500">Org-wide amount set by Admin for this month</p>
        </Card>
        <Card className="border border-slate-200 bg-white shadow-none">
          <p className="text-sm text-slate-500">Payroll Structure</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{payroll?.salaryStructure ?? employee.salaryStructure}</p>
          <p className="mt-2 text-sm text-slate-500">Read-only salary structure visible to the employee</p>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border border-slate-200 bg-white shadow-none">
          <h2 className="text-xl font-semibold text-slate-900">Personal Details</h2>
          <p className="mt-1 text-sm text-slate-500">All your employee information in one place.</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Detail label="Employee ID" value={employee.id} />
            <Detail label="Name" value={`${employee.firstName} ${employee.lastName}`} />
            <Detail label="Email" value={employee.email} />
            <Detail label="Phone" value={employee.phone} />
            <Detail label="Address" value={employee.address} />
            <Detail label="Date of Joining" value={employee.dateOfJoining} />
            <Detail label="Department" value={employee.department} />
            <Detail label="Designation" value={employee.designation} />
            <Detail label="Team Leader" value={employee.teamLeader} />
            <Detail label="Employment Type" value={employee.employmentType} />
            <Detail label="Shift Assignment" value={employee.shiftAssignment} />
            <Detail label="Status" value={employee.status} />
            <Detail label="Emergency Contact" value={employee.emergencyContact} />
            <Detail label="Bank Details" value={employee.bankDetails} />
            <Detail label="PAN / Aadhaar" value={employee.panAadhaar} />
          </div>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-none">
          <h2 className="text-xl font-semibold text-slate-900">Progress Snapshot</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-[#f8f8f4] p-4">
              <p className="text-sm text-slate-500">Daily Commitment</p>
              <p className="mt-2 font-medium text-slate-900">{goal.dailyCommitment}</p>
            </div>
            <div className="rounded-2xl bg-[#f8f8f4] p-4">
              <p className="text-sm text-slate-500">Monthly Target</p>
              <p className="mt-2 font-medium text-slate-900">{goal.monthlyTarget}</p>
            </div>
            <div className="rounded-2xl bg-[#f8f8f4] p-4">
              <p className="text-sm text-slate-500">Announcements Available</p>
              <p className="mt-2 font-medium text-slate-900">{announcementCount} active admin announcements</p>
            </div>
            <p className="text-xs text-slate-500">Last updated: {goal.lastUpdated}</p>
          </div>
        </Card>
      </div>

      <AnnouncementBoard role="Employee" />
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-[#f8f8f4] p-4">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 font-medium text-slate-900">{value}</p>
  </div>
);

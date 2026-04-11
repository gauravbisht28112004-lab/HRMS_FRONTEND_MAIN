import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types';

export const LoginPage = () => {
  const { isAuthenticated, loginAsRole } = useAuthStore();
  const [role, setRole] = useState<UserRole>('HR');
  const [email, setEmail] = useState('ishita.rao@finbud.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    loginAsRole(role);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="grid w-full max-w-6xl gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 p-8 text-white shadow-panel">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-white p-3 shadow-lg">
              <img src="/finbud-logo.png" alt="Finbud Financial logo" className="h-16 w-16 object-contain" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-brand-100/80">Finbud Financial</p>
              <h2 className="mt-2 text-2xl font-semibold">Financial Portal</h2>
            </div>
          </div>

          <h1 className="mt-8 max-w-lg text-4xl font-semibold leading-tight">
            Secure HRMS access for HR, Admin, Team Leaders, and Employees.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-brand-100/85">
            Finbud Financial is the internal workspace for payroll, attendance, leave, team reporting, and employee self-service.
            Visit <span className="font-semibold text-white">finbudfinancial.com</span> for the external brand presence, and use this portal
            to test the exact dashboard and permissions for each role.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white/12 p-5 ring-1 ring-white/10">
              <ShieldCheck size={22} />
              <p className="mt-4 font-medium">Role-based security</p>
              <p className="mt-2 text-sm text-brand-100/80">Admin and HR get broader control, employees stay in self-service flows.</p>
            </div>
            <div className="rounded-3xl bg-white/12 p-5 ring-1 ring-white/10">
              <Users size={22} />
              <p className="mt-4 font-medium">Employee self-service</p>
              <p className="mt-2 text-sm text-brand-100/80">Employees can update personal details once, then HR takes over further edits.</p>
            </div>
            <div className="rounded-3xl bg-white/12 p-5 ring-1 ring-white/10">
              <Building2 size={22} />
              <p className="mt-4 font-medium">Enterprise-ready UI</p>
              <p className="mt-2 text-sm text-brand-100/80">Payroll, leave, attendance, audit logs, and reports in one workspace.</p>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div>
            <p className="text-sm text-brand-700">Login Dashboard</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Sign in to HRMS</h2>
            <p className="mt-2 text-sm text-slate-500">Demo login for role-based dashboards.</p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <Select
              label="Login as"
              value={role}
              onChange={(event) => {
                const selectedRole = event.target.value as UserRole;
                setRole(selectedRole);
                const nextEmail =
                  selectedRole === 'Admin'
                    ? 'admin@finbud.com'
                    : selectedRole === 'Team Leader'
                      ? 'rohan.mehta@finbud.com'
                      : selectedRole === 'Employee'
                        ? 'aanya.sharma@finbud.com'
                        : 'ishita.rao@finbud.com';
                setEmail(nextEmail);
              }}
              options={[
                { label: 'HR', value: 'HR' },
                { label: 'Admin', value: 'Admin' },
                { label: 'Team Leader', value: 'Team Leader' },
                { label: 'Employee', value: 'Employee' },
              ]}
            />
            <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              <span>Password</span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-500 transition hover:text-slate-800"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

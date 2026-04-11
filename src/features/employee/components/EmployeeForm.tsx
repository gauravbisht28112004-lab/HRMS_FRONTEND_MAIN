import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Employee } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface EmployeeFormProps {
  initialValues?: Employee;
}

const defaultValues: Employee = {
  id: 'AUTO-GENERATED',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  dateOfJoining: '',
  department: 'Finance',
  designation: '',
  teamLeader: '',
  salaryStructure: '',
  employmentType: 'Full Time',
  shiftAssignment: 'General Shift',
  status: 'Active',
  emergencyContact: '',
  bankDetails: '',
  panAadhaar: '',
  performanceScore: 0,
  profilePicture: '',
};

export const EmployeeForm = ({ initialValues = defaultValues }: EmployeeFormProps) => {
  const [form, setForm] = useState<Employee>(initialValues);
  const [preview, setPreview] = useState(initialValues.profilePicture ?? '');

  useEffect(() => {
    setForm(initialValues);
    setPreview(initialValues.profilePicture ?? '');
  }, [initialValues]);

  const updateField =
    (key: keyof Employee) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setForm((prev) => ({ ...prev, profilePicture: url }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.alert(`Employee payload ready for API submit:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Input label="Employee ID" value={form.id} disabled />
          <Input label="First Name" value={form.firstName} onChange={updateField('firstName')} />
          <Input label="Last Name" value={form.lastName} onChange={updateField('lastName')} />
          <Input label="Email" type="email" value={form.email} onChange={updateField('email')} />
          <Input label="Phone" value={form.phone} onChange={updateField('phone')} />
          <Input label="Date of Joining" type="date" value={form.dateOfJoining} onChange={updateField('dateOfJoining')} />
          <Input label="Designation" value={form.designation} onChange={updateField('designation')} />
          <Input label="Team Leader" value={form.teamLeader} onChange={updateField('teamLeader')} />
          <Input label="Salary Structure" value={form.salaryStructure} onChange={updateField('salaryStructure')} />
          <Input label="Emergency Contact" value={form.emergencyContact} onChange={updateField('emergencyContact')} />
          <Input label="Bank Details" value={form.bankDetails} onChange={updateField('bankDetails')} />
          <Input label="PAN / Aadhaar" value={form.panAadhaar} onChange={updateField('panAadhaar')} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Select
            label="Department"
            value={form.department}
            onChange={updateField('department')}
            options={[
              { label: 'Finance', value: 'Finance' },
              { label: 'Engineering', value: 'Engineering' },
              { label: 'HR', value: 'HR' },
            ]}
          />
          <Select
            label="Employment Type"
            value={form.employmentType}
            onChange={updateField('employmentType')}
            options={[
              { label: 'Full Time', value: 'Full Time' },
              { label: 'Contract', value: 'Contract' },
              { label: 'Intern', value: 'Intern' },
            ]}
          />
          <Select
            label="Shift Assignment"
            value={form.shiftAssignment}
            onChange={updateField('shiftAssignment')}
            options={[
              { label: 'General Shift', value: 'General Shift' },
              { label: 'Flex Shift', value: 'Flex Shift' },
            ]}
          />
          <Select
            label="Status"
            value={form.status}
            onChange={updateField('status')}
            options={[
              { label: 'Active', value: 'Active' },
              { label: 'On Leave', value: 'On Leave' },
              { label: 'Inactive', value: 'Inactive' },
            ]}
          />
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          <span>Address</span>
          <textarea
            value={form.address}
            onChange={updateField('address')}
            rows={3}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">Profile Picture Upload</p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center">
            <input type="file" accept="image/*" onChange={handleProfileChange} className="text-sm text-slate-500" />
            {preview ? <img src={preview} alt="Profile preview" className="h-16 w-16 rounded-2xl object-cover" /> : null}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary">
            Save Draft
          </Button>
          <Button type="submit">Submit Employee</Button>
        </div>
      </form>
    </Card>
  );
};

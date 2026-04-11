import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export const TeamLeaderMonthlyCommitmentPage = () => {
  const [form, setForm] = useState({
    teamDisbursalGoal: '1200000',
    reviewCoverage: '100',
    reportCompliance: '95',
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Team Leader Monthly Commitment" description="Manage the monthly commitment plan for your own team leadership goals." />
      <Card className="border border-slate-200 bg-white shadow-none">
        <div className="grid gap-4 md:grid-cols-3">
          <Input label="Team Disbursal Goal (INR)" type="number" value={form.teamDisbursalGoal} onChange={(event) => setForm({ ...form, teamDisbursalGoal: event.target.value })} />
          <Input label="Review Coverage %" type="number" value={form.reviewCoverage} onChange={(event) => setForm({ ...form, reviewCoverage: event.target.value })} />
          <Input label="Report Compliance %" type="number" value={form.reportCompliance} onChange={(event) => setForm({ ...form, reportCompliance: event.target.value })} />
        </div>
        <div className="mt-5 flex justify-end">
          <Button>Save Monthly Commitment</Button>
        </div>
      </Card>
    </div>
  );
};

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export const TeamLeaderDailyCommitmentPage = () => {
  const [form, setForm] = useState({
    teamFollowUps: '8',
    reportReviews: '4',
    approvalClosures: '6',
    blockersToResolve: '3',
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Team Leader Daily Commitment" description="Set and track the team leader's daily operating commitments." />
      <Card className="border border-slate-200 bg-white shadow-none">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Team Follow Ups" type="number" value={form.teamFollowUps} onChange={(event) => setForm({ ...form, teamFollowUps: event.target.value })} />
          <Input label="Report Reviews" type="number" value={form.reportReviews} onChange={(event) => setForm({ ...form, reportReviews: event.target.value })} />
          <Input label="Approvals to Close" type="number" value={form.approvalClosures} onChange={(event) => setForm({ ...form, approvalClosures: event.target.value })} />
          <Input label="Blockers to Resolve" type="number" value={form.blockersToResolve} onChange={(event) => setForm({ ...form, blockersToResolve: event.target.value })} />
        </div>
        <div className="mt-5 flex justify-end">
          <Button>Save Daily Commitment</Button>
        </div>
      </Card>
    </div>
  );
};

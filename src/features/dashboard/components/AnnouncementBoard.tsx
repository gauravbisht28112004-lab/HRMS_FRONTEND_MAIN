import { ChangeEvent, useMemo, useState } from 'react';
import { Megaphone } from 'lucide-react';
import { announcements as seedAnnouncements } from '@/constants/mockData';
import { Announcement, UserRole } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/common/StatusBadge';

interface AnnouncementBoardProps {
  role: UserRole;
  canCreate?: boolean;
}

export const AnnouncementBoard = ({ role, canCreate = false }: AnnouncementBoardProps) => {
  const [items, setItems] = useState(seedAnnouncements);
  const [draft, setDraft] = useState({
    title: '',
    message: '',
    priority: 'Medium' as Announcement['priority'],
    imageUrl: '',
  });

  const visibleItems = useMemo(
    () => items.filter((item) => item.audience.includes(role)).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [items, role],
  );

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setDraft((current) => ({
      ...current,
      imageUrl: URL.createObjectURL(file),
    }));
  };

  const createAnnouncement = () => {
    if (!draft.title.trim() || !draft.message.trim()) return;

    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        title: draft.title,
        message: draft.message,
        createdBy: 'Arjun Malhotra',
        createdAt: '2026-04-07 15:00',
        priority: draft.priority,
        audience: ['Admin', 'HR', 'Team Leader', 'Employee'],
        imageUrl: draft.imageUrl,
      },
      ...prev,
    ]);
    setDraft({ title: '', message: '', priority: 'Medium', imageUrl: '' });
  };

  return (
    <div className="space-y-6">
      {canCreate ? (
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
              <Megaphone size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Admin Announcement Center</h3>
              <p className="text-sm text-slate-500">Create announcements visible across all role dashboards.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input label="Title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              <span>Priority</span>
              <select
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                value={draft.priority}
                onChange={(event) => setDraft({ ...draft, priority: event.target.value as Announcement['priority'] })}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              <span>Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-brand-700 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
              />
            </label>
            <div className="md:col-span-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                <span>Announcement Message</span>
                <textarea
                  rows={4}
                  value={draft.message}
                  onChange={(event) => setDraft({ ...draft, message: event.target.value })}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </label>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button onClick={createAnnouncement}>Publish Announcement</Button>
            </div>
          </div>
        </Card>
      ) : null}

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Announcements</h3>
            <p className="text-sm text-slate-500">Published by Admin and visible to your role.</p>
          </div>
          <StatusBadge label={`${visibleItems.length} Active`} tone="info" />
        </div>
        <div className="mt-5 space-y-4">
          {visibleItems.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-semibold text-slate-900">{item.title}</h4>
                <StatusBadge
                  label={item.priority}
                  tone={item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'info'}
                />
              </div>
              {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="mt-3 max-h-56 w-full rounded-2xl object-cover" /> : null}
              <p className="mt-2 text-sm text-slate-600">{item.message}</p>
              <p className="mt-3 text-xs text-slate-500">
                {item.createdBy} • {item.createdAt}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

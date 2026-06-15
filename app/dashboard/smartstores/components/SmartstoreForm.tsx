'use client';

import { useState } from 'react';

type Smartstore = {
  id?: string;
  name: string;
  sellerId: string;
  storeUrl?: string;
  clientId?: string;
  clientSecret?: string;
  naverPartnerType: string;
  naverAccountId?: string;
};

interface Props {
  initialData?: Smartstore;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function SmartstoreForm({ initialData, onSuccess, onCancel }: Props) {
  const [formData, setFormData] = useState<Smartstore>({
    name: initialData?.name || '',
    sellerId: initialData?.sellerId || '',
    storeUrl: initialData?.storeUrl || '',
    clientId: initialData?.clientId || '',
    clientSecret: initialData?.clientSecret || '',
    naverPartnerType: initialData?.naverPartnerType || 'SELF',
    naverAccountId: initialData?.naverAccountId || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = initialData?.id 
        ? `/api/smartstores/${initialData.id}` 
        : '/api/smartstores';
      const method = initialData?.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-lg rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-md dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          {initialData?.id ? 'Edit Smartstore' : 'Add Smartstore'}
        </h2>
        
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Store Name *</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="w-full rounded-xl border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" placeholder="My Store" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Seller ID *</label>
              <input required name="sellerId" value={formData.sellerId} onChange={handleChange} className="w-full rounded-xl border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" placeholder="seller123" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Store URL</label>
            <input name="storeUrl" value={formData.storeUrl} onChange={handleChange} className="w-full rounded-xl border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" placeholder="https://smartstore.naver.com/..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Partner Type</label>
              <select name="naverPartnerType" value={formData.naverPartnerType} onChange={handleChange} className="w-full rounded-xl border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
                <option value="SELF">SELF</option>
                <option value="AGENCY">AGENCY</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Naver Account ID</label>
              <input name="naverAccountId" value={formData.naverAccountId} onChange={handleChange} className="w-full rounded-xl border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Client ID (API)</label>
            <input name="clientId" value={formData.clientId} onChange={handleChange} className="w-full rounded-xl border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Client Secret (API)</label>
            <input type="password" name="clientSecret" value={formData.clientSecret} onChange={handleChange} className="w-full rounded-xl border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <button type="button" onClick={onCancel} className="rounded-xl px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 disabled:opacity-70">
              {loading ? 'Saving...' : 'Save Smartstore'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import SmartstoreForm from './components/SmartstoreForm';

type Smartstore = {
  id: string;
  name: string;
  sellerId: string;
  storeUrl?: string;
  naverPartnerType: string;
  createdAt: string;
};

export default function SmartstoresPage() {
  const [stores, setStores] = useState<Smartstore[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<any>(null);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/smartstores');
      const data = await res.json();
      setStores(data);
    } catch (err) {
      console.error('Failed to fetch stores', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this store?')) return;
    try {
      const res = await fetch(`/api/smartstores/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStores();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddForm = () => {
    setEditingStore(null);
    setIsFormOpen(true);
  };

  const openEditForm = (store: Smartstore) => {
    setEditingStore(store);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingStore(null);
  };

  const handleFormSuccess = () => {
    closeForm();
    fetchStores();
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 p-8 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Smartstores</h1>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Manage your connected Naver Smartstores and API keys.</p>
          </div>
          <button onClick={openAddForm} className="group flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-90">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Store
          </button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-600"></div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <div key={store.id} className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:hover:shadow-blue-900/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-900/10"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20">
                      Active
                    </span>
                    <span className="text-xs font-medium text-neutral-400">{store.naverPartnerType}</span>
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-neutral-900 dark:text-white">{store.name}</h3>
                  <p className="mb-6 font-mono text-sm text-neutral-500 dark:text-neutral-400">ID: {store.sellerId}</p>
                </div>
                
                <div className="relative z-10 flex items-center gap-2 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                  <button onClick={() => openEditForm(store)} className="flex-1 rounded-xl bg-neutral-100 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(store.id)} className="flex-1 rounded-xl bg-red-50 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40">
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {stores.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 py-24 text-center dark:border-neutral-800 dark:bg-neutral-900/50">
                <svg className="mb-4 h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">No smartstores</h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Get started by creating a new smartstore.</p>
                <button onClick={openAddForm} className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  + Add your first store
                </button>
              </div>
            )}
          </div>
        )}

        {isFormOpen && (
          <SmartstoreForm
            initialData={editingStore}
            onSuccess={handleFormSuccess}
            onCancel={closeForm}
          />
        )}
      </div>
    </div>
  );
}

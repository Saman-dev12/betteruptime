'use client';

import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function MonitorPage() {
  const { getToken } = useAuth();

  const [monitors, setMonitors] = useState<any[]>([]);
  const [monitorDetails, setMonitorDetails] = useState<any>(null);
  const [form, setForm] = useState({ name: '', url: '', frequency: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const API_URL = 'http://localhost:8000/api/monitor';

  const fetchMonitors = async () => {
    const token = await getToken();
    const res = await fetch(`${API_URL}/get-all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMonitors(data.monitors || []);
  };

  const fetchOneMonitor = async (id: string) => {
    const token = await getToken();
    const res = await fetch(`${API_URL}/get-one/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMonitorDetails(data.monitor || null);
  };

  const addMonitor = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Add failed');
      setStatus('Monitor added.');
      fetchMonitors();
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteMonitor = async (id: string) => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      setStatus('Monitor deleted.');
      fetchMonitors();
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitors();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Monitor Dashboard</h1>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-lg font-semibold">Add Monitor</h2>
        <input
          placeholder="Name"
          className="border p-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="URL"
          className="border p-2 w-full"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
        <input
          placeholder="Frequency (min)"
          type="number"
          className="border p-2 w-full"
          value={form.frequency}
          onChange={(e) => setForm({ ...form, frequency: e.target.value })}
        />
        <button
          onClick={addMonitor}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Monitor'}
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Your Monitors</h2>
        {monitors.map((monitor) => (
          <div key={monitor.id} className="border-b py-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{monitor.name}</p>
              <p className="text-sm text-gray-500">{monitor.url}</p>
              <button
                onClick={() => {
                  setSelectedId(monitor.id);
                  fetchOneMonitor(monitor.id);
                }}
                className="text-blue-500 text-sm mr-2"
              >
                View
              </button>
              <button
                onClick={() => deleteMonitor(monitor.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {monitorDetails && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Monitor Details</h2>
          <p><strong>Name:</strong> {monitorDetails.name}</p>
          <p><strong>URL:</strong> {monitorDetails.url}</p>
          <p><strong>Frequency:</strong> {monitorDetails.frequency} min</p>
        </div>
      )}

      {status && <div className="text-sm text-gray-600">{status}</div>}
    </div>
  );
}

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '../store/authStore';
import { StatCard } from '../components/stats/StatCard';

const mockData = [
  { date: '2024-03-01', bcs: 3.2 },
  { date: '2024-03-02', bcs: 3.4 },
  { date: '2024-03-03', bcs: 3.1 },
  { date: '2024-03-04', bcs: 3.5 },
  { date: '2024-03-05', bcs: 3.3 },
];

export function Dashboard() {
  const user = useAuthStore(state => state.user);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome back, {user?.username}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Latest BCS"
            value={3.3}
            bgColor="bg-blue-50"
            textColor="text-blue-800"
          />
          <StatCard
            title="Average BCS"
            value={3.4}
            bgColor="bg-green-50"
            textColor="text-green-800"
          />
          <StatCard
            title="Total Scans"
            value={5}
            bgColor="bg-purple-50"
            textColor="text-purple-800"
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">BCS Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="bcs" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  Search,
  ClipboardList,
  Clock,
  CheckCircle,
  Bell,
} from "lucide-react";

export default function StaffDashboard() {
  const [stats] = useState({
    tasks: "14",
    completed: "9",
    hours: "7h 30m",
    notifications: "3",
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Staff Dashboard
        </h1>

        <div className="relative w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search tasks or updates..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
          />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Assigned Tasks"
            value={stats.tasks}
            icon={<ClipboardList size={20} className="text-indigo-600" />}
          />
          <StatCard
            title="Completed Tasks"
            value={stats.completed}
            icon={<CheckCircle size={20} className="text-indigo-600" />}
          />
          <StatCard
            title="Today’s Work Hours"
            value={stats.hours}
            icon={<Clock size={20} className="text-indigo-600" />}
          />
          <StatCard
            title="New Notifications"
            value={stats.notifications}
            icon={<Bell size={20} className="text-indigo-600" />}
          />
        </div>

        {/* TODAY'S ACTIVITY */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-4">
            Today’s Activity
          </h2>

          <ul className="space-y-4">
            <ActivityItem text="Completed task: Update client report" />
            <ActivityItem text="New task assigned: Review project files" />
            <ActivityItem text="Clocked in at 9:30 AM" />
            <ActivityItem text="Reminder: Team meeting at 4:00 PM" />
          </ul>
        </div>

      </main>
    </div>
  );
}

/* -------- UI COMPONENTS -------- */

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
        {title}
      </p>
      <p className="text-2xl font-black text-slate-900">
        {value}
      </p>
    </div>
    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
      {icon}
    </div>
  </div>
);

const ActivityItem = ({ text }) => (
  <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
    <span className="w-2 h-2 bg-indigo-500 rounded-full" />
    {text}
  </li>
);

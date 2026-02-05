import { useState } from "react";
import {
  Search,
  Users,
  UserPlus,
  CalendarCheck,
  IndianRupee,
} from "lucide-react";

export default function HRDashboard() {
  const [stats] = useState({
    employees: "86",
    newHires: "4",
    attendance: "92%",
    payroll: "₹12.4L",
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          HR Dashboard
        </h1>

        <div className="relative w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
          />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Employees"
            value={stats.employees}
            icon={<Users size={20} className="text-indigo-600" />}
          />
          <StatCard
            title="New Hires (This Month)"
            value={stats.newHires}
            icon={<UserPlus size={20} className="text-indigo-600" />}
          />
          <StatCard
            title="Attendance Rate"
            value={stats.attendance}
            icon={<CalendarCheck size={20} className="text-indigo-600" />}
          />
          <StatCard
            title="Monthly Payroll"
            value={stats.payroll}
            icon={<IndianRupee size={20} className="text-indigo-600" />}
          />
        </div>

        {/* HR ACTIVITY */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-4">
            HR Activity
          </h2>

          <ul className="space-y-4">
            <ActivityItem text="4 employees onboarded this month" />
            <ActivityItem text="Attendance processed for today" />
            <ActivityItem text="Payroll initiated for March" />
            <ActivityItem text="Leave requests pending approval" />
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

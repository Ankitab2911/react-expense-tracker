import React from 'react';
import { Wallet, LayoutDashboard, User, LogOut } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, user, onLogout }) => {
  return (
    <div className="w-64 bg-gradient-to-b from-violet-600 to-purple-700 text-white p-6 shadow-xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Wallet className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold">ExpenseTracker</h1>
        </div>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
            currentView === 'dashboard' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setCurrentView('profile')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
            currentView === 'profile' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>

      <div className="mt-auto pt-8">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
          <p className="text-sm text-white/80">Logged in as</p>
          <p className="font-semibold">{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
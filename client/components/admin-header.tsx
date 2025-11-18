import { LogOut, Bell, Settings } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">FoodHub Admin</h1>
            <p className="text-xs text-neutral-600">Restaurant Management Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Bell size={20} className="text-neutral-600" />
          </button>
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Settings size={20} className="text-neutral-600" />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

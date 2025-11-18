import { ShoppingBag, Store, BarChart3, Settings, ChevronLeft } from 'lucide-react';

type Tab = 'dashboard' | 'orders' | 'restaurants' | 'analytics' | 'settings';

interface AdminSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  sidebarOpen: boolean;
}

export default function AdminSidebar({ activeTab, setActiveTab, sidebarOpen }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ShoppingBag },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'restaurants', label: 'Restaurants', icon: Store },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-neutral-200 transition-all duration-300 z-40 pt-20 ${
      sidebarOpen ? 'w-64' : 'w-0'
    } overflow-hidden`}>
      <nav className="p-4 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-orange-500 text-white'
                  : 'text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

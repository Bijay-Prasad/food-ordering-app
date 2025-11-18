'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogOut, Users, ShoppingBag, TrendingUp, Settings } from 'lucide-react';
import AdminHeader from '@/components/admin-header';
import AdminSidebar from '@/components/admin-sidebar';
import OrdersList from '@/components/admin/orders-list';
import RestaurantsList from '@/components/admin/restaurants-list';
import Analytics from '@/components/admin/analytics';

type Tab = 'dashboard' | 'orders' | 'restaurants' | 'analytics' | 'settings';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock admin data
  const stats = [
    { label: 'Total Orders', value: '2,543', icon: ShoppingBag, trend: '+12%' },
    { label: 'Active Users', value: '8,234', icon: Users, trend: '+8%' },
    { label: 'Revenue', value: '$45,231', icon: TrendingUp, trend: '+23%' },
  ];

  const recentOrders = [
    { id: '1001', customer: 'John Doe', restaurant: 'Burger Palace', amount: '$45.99', status: 'delivered', time: '2 hours ago' },
    { id: '1002', customer: 'Jane Smith', restaurant: 'Pizza Heaven', amount: '$52.50', status: 'in-progress', time: '15 mins ago' },
    { id: '1003', customer: 'Mike Johnson', restaurant: 'Dragon Wok', amount: '$38.99', status: 'pending', time: 'Just now' },
    { id: '1004', customer: 'Sarah Williams', restaurant: 'Taco Fiesta', amount: '$31.45', status: 'delivered', time: '4 hours ago' },
    { id: '1005', customer: 'Tom Brown', restaurant: 'Sushi Master', amount: '$67.99', status: 'in-progress', time: '25 mins ago' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersList orders={recentOrders} />;
      case 'restaurants':
        return <RestaurantsList />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="card p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-neutral-600 text-sm font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <Icon size={24} className="text-orange-500" />
                      </div>
                    </div>
                    <p className="text-orange-500 text-sm font-semibold mt-4">{stat.trend} from last month</p>
                  </div>
                );
              })}
            </div>

            {/* Recent Orders */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-neutral-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold">Restaurant</th>
                      <th className="text-left py-3 px-4 font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.slice(0, 5).map(order => (
                      <tr key={order.id} className="border-b border-neutral-200 hover:bg-neutral-100">
                        <td className="py-3 px-4 font-semibold text-orange-500">#{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">{order.restaurant}</td>
                        <td className="py-3 px-4 font-semibold">{order.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-neutral-600">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <AdminHeader onLogout={() => window.location.href = '/'} />
      
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'FoodHub Admin',
    email: 'admin@foodhub.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, NY 10001',
  });

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="card p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleSettingChange('storeName', e.target.value)}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleSettingChange('email', e.target.value)}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleSettingChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleSettingChange('address', e.target.value)}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-primary"
            />
          </div>

          <button className="btn-primary">Save Settings</button>
        </div>
      </div>
    </div>
  );
}

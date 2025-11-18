import { TrendingUp, TrendingDown } from 'lucide-react';

export default function Analytics() {
  const analyticsData = [
    { label: 'Total Revenue', value: '$125,430', trend: '+18%', positive: true },
    { label: 'Order Count', value: '4,231', trend: '+12%', positive: true },
    { label: 'Average Order Value', value: '$29.65', trend: '-3%', positive: false },
    { label: 'Customer Satisfaction', value: '4.8/5', trend: '+0.2', positive: true },
    { label: 'Delivery Time (avg)', value: '32 min', trend: '-5 min', positive: true },
    { label: 'Cancellation Rate', value: '2.3%', trend: '-0.8%', positive: true },
  ];

  const dailyRevenue = [
    { day: 'Mon', revenue: 12000 },
    { day: 'Tue', revenue: 14500 },
    { day: 'Wed', revenue: 13200 },
    { day: 'Thu', revenue: 15800 },
    { day: 'Fri', revenue: 18900 },
    { day: 'Sat', revenue: 21300 },
    { day: 'Sun', revenue: 19600 },
  ];

  const maxRevenue = Math.max(...dailyRevenue.map(d => d.revenue));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {analyticsData.map((metric, index) => (
          <div key={index} className="card p-6">
            <p className="text-neutral-600 text-sm font-medium mb-2">{metric.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{metric.value}</p>
              <div className={`flex items-center gap-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.positive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                <span className="text-sm font-semibold">{metric.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-6">Daily Revenue</h2>
        
        <div className="flex items-end justify-between h-64 gap-2">
          {dailyRevenue.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-neutral-200 rounded-t-lg relative group" style={{
                height: `${(item.revenue / maxRevenue) * 100}%`,
                backgroundColor: '#FF6B35',
              }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  ${(item.revenue / 1000).toFixed(1)}k
                </div>
              </div>
              <span className="text-sm font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

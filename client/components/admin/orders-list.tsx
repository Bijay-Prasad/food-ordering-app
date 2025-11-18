import { MoreVertical, Truck, Clock, CheckCircle } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  restaurant: string;
  amount: string;
  status: string;
  time: string;
}

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      
      <div className="card p-6">
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
                <th className="text-left py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-neutral-200 hover:bg-neutral-100">
                  <td className="py-3 px-4 font-semibold text-orange-500">#{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">{order.restaurant}</td>
                  <td className="py-3 px-4 font-semibold">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 w-fit ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'delivered' && <CheckCircle size={16} />}
                      {order.status === 'in-progress' && <Truck size={16} />}
                      {order.status === 'pending' && <Clock size={16} />}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-600">{order.time}</td>
                  <td className="py-3 px-4">
                    <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors">
                      <MoreVertical size={18} className="text-neutral-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

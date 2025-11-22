import api from "@/lib/axios";
import {
  MoreVertical,
  Truck,
  Clock,
  CheckCircle,
  Ban,
  IndianRupee,
  DollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type OrderItem = {
  menuItem: {
    _id?: string;
    name?: string;
    price?: number;
    image?: string;
    restaurant?: { _id?: string; name?: string };
  };
  quantity: number;
};

type Order = {
  _id: string;
  user?: {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    country?: string;
  };
  items: OrderItem[];
  status: string;
  paymentMethod: string;
  country?: string;
  createdAt: string;
};

// interface Order {
//   id: string;
//   customer: string;
//   restaurant: string;
//   amount: string;
//   status: string;
//   time: string;
// }

// interface OrdersListProps {
//   orders: Order[];
// }

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/orders");
      setOrders(res.data || []);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err.message || "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const markPaid = async (id: string) => {
    if (!confirm("Mark this order as Paid?")) return;
    try {
      await api.put(`/api/orders/payment/${id}`, { paymentMethod: "Paid" });
      toast.success("Order marked as paid");
      loadOrders();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update payment");
    }
  };

  const cancelOrder = async (id: string) => {
    if (!confirm("Cancel this order?")) return;
    try {
      await api.put(`/api/orders/cancel/${id}`);
      toast.success("Order cancelled");
      loadOrders();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to cancel order");
    }
  };

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (orders.length === 0) return <div className="p-6">No orders found.</div>;

  console.log(orders);

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
                <th className="text-left py-3 px-4 font-semibold">
                  Restaurant
                </th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Time</th>
                <th className="text-left py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => {
                const restaurantName =
                  order.items?.[0]?.menuItem?.restaurant?.name || "—";
                const total = order.items.reduce(
                  (s, it) => s + (it.menuItem?.price || 0) * it.quantity,
                  0
                );
                return (
                  <tr
                    key={order._id}
                    className="border-b border-neutral-200 hover:bg-neutral-100"
                  >
                    <td className="py-3 px-4 font-semibold text-orange-500">
                      #{order._id}
                    </td>
                    <td className="py-3 px-4">{order.user?.name}</td>
                    <td className="py-3 px-4">{restaurantName}</td>
                    <td className="py-3 px-4 font-semibold">
                      {order.country == "India" ? "₹" : "$"}
                      {total}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 w-fit ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status === "delivered" && (
                          <CheckCircle size={16} />
                        )}
                        {order.status === "in-progress" && <Truck size={16} />}
                        {order.status === "pending" && <Clock size={16} />}
                        {order.status === "cancelled" && <Ban size={16} />}
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-600">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors">
                        <MoreVertical size={18} className="text-neutral-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

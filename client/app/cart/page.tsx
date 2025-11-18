'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/lib/cart-context';
import Header from '@/components/header';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const subtotal = getTotalPrice();
  const deliveryFee = items.length > 0 ? 3.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-neutral-600 mb-8">Add some delicious food to get started</p>
            <Link href="/" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Group items by restaurant
  const itemsByRestaurant = items.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = [];
    }
    acc[item.restaurantId].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const handleRemoveItem = (itemName: string) => {
    removeItem(itemName);
    toast.error(`${itemName} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.error('Cart cleared');
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-orange-500 font-medium hover:underline mb-8">
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Your Order</h1>
            
            {Object.entries(itemsByRestaurant).map(([restaurantId, restaurantItems]) => (
              <div key={restaurantId} className="card mb-6 p-0 overflow-hidden">
                <div className="bg-orange-500 text-white p-4">
                  <h2 className="font-bold text-lg">{restaurantItems[0].restaurantName}</h2>
                </div>
                
                <div className="p-4 space-y-4">
                  {restaurantItems.map(item => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-neutral-200 last:border-b-0 last:pb-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-orange-500 font-bold">${item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-neutral-100 rounded"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-neutral-100 rounded"
                        >
                          <Plus size={18} />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.name)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Delivery</span>
                  <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-orange-500">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className="btn-primary w-full text-center block mb-3">
                Proceed to Checkout
              </Link>
              <button
                onClick={handleClearCart}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-neutral-900 hover:bg-neutral-100 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

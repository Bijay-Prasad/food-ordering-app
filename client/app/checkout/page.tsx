'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, Mail, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/lib/cart-context';
import Header from '@/components/header';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = items.length > 0 ? 3.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.zip) {
      toast.error('Missing required fields', {
        description: 'Please fill in all required fields to proceed',
      });
      return;
    }
    toast.success('Order placed successfully!', {
      description: `Order #${Math.floor(Math.random() * 100000)} - Delivering to ${deliveryInfo.address}`,
    });
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <Link href="/" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6 text-6xl">✓</div>
          <h1 className="text-4xl font-bold mb-4 text-orange-500">Order Placed!</h1>
          <p className="text-neutral-600 text-lg mb-8">Thank you for your order. You will receive updates via SMS.</p>
          <Link href="/" className="btn-primary inline-block">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/cart" className="flex items-center gap-2 text-orange-500 font-medium hover:underline mb-8">
          <ArrowLeft size={20} />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Delivery Information */}
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="text-orange-500" />
                  Delivery Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={deliveryInfo.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={deliveryInfo.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={deliveryInfo.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={deliveryInfo.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={deliveryInfo.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zip"
                        value={deliveryInfo.zip}
                        onChange={handleInputChange}
                        placeholder="10001"
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="text-orange-500" />
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-orange-500" onClick={() => setPaymentMethod('credit-card')}>
                    <input
                      type="radio"
                      name="payment"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="ml-3 font-medium">Credit Card</span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-orange-500" onClick={() => setPaymentMethod('debit-card')}>
                    <input
                      type="radio"
                      name="payment"
                      value="debit-card"
                      checked={paymentMethod === 'debit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="ml-3 font-medium">Debit Card</span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-orange-500" onClick={() => setPaymentMethod('paypal')}>
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="ml-3 font-medium">PayPal</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-lg">
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-neutral-200">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-neutral-200">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Delivery</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import Link from 'next/link';
import { ShoppingCart, MapPin } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-orange-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold text-neutral-900">FoodHub</span>
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center gap-2 text-neutral-600">
            <MapPin size={18} />
            <span className="text-sm">Current location</span>
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <div className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-lg transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

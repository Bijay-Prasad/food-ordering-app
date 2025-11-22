'use client';

import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface MenuItemProps {
  countryCode: string;
  item: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };
  onAddToCart: () => void;
}

export default function MenuItem({ countryCode, item, onAddToCart }: MenuItemProps) {
  // console.log("Rendering MenuItem:", item);
  const handleAddToCart = () => {
    toast.success(`${item.name} added to cart!`, {
      description: `$${item.price} - Ready to checkout whenever you are`,
    });
    onAddToCart();
  };

  // console.log("MenuItem image URL:", item.image);

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 bg-neutral-200 overflow-hidden">
        <img
          src={"/"+item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
        <p className="text-sm text-neutral-600 mb-4">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">{countryCode == 'IN' ? '₹' : '$'}{item.price}</span>
          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

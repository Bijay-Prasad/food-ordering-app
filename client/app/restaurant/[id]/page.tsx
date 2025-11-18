"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, DollarSign } from "lucide-react";
import { restaurants } from "@/lib/mock-data";
import MenuItem from "@/components/menu-item";
import { useCart } from "@/lib/cart-context";

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const restaurant = restaurants.find((r) => r.id === id);
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-orange-500 font-medium hover:underline"
          >
            <ArrowLeft size={20} />
            Back
          </Link>
        </div>
      </div>

      {/* Restaurant Hero */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              className="w-full md:w-1/3 h-64 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-neutral-600 text-lg mb-4">
                {restaurant.cuisine}
              </p>

              <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-orange-500 text-orange-500" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-neutral-600">
                    ({restaurant.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Clock size={20} />
                  <span>{restaurant.deliveryTime} min</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <DollarSign size={20} />
                  <span>${restaurant.deliveryFee}</span>
                </div>
              </div>

              <Link href="/cart" className="btn-primary">
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Menu</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.menu.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, DollarSign, IndianRupee } from "lucide-react";
import { restaurants } from "@/lib/mock-data";
import MenuItem from "@/components/menu-item";
import { useCart } from "@/lib/cart-context";
import api from "@/lib/axios";

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addItem } = useCart();
  // const restaurant = restaurants.find((r) => r.id === id);
  const [restaurant, setRestaurant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let mounted = true;
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/api/restaurants/${id}`);
        if (!mounted) return;
        setRestaurant(res.data);
        // console.log("Fetched restaurant:", res.data);
      } catch (err: any) {
        if (!mounted) return;
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to load restaurant"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRestaurant();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

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
      id: item._id || item.id,
      restaurantId: restaurant._id || restaurant.id,
      restaurantName: restaurant.name,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  // console.log("Fetched restaurant image:", restaurant.image);s

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
              src={"/" + restaurant.image || "/placeholder.svg"}
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
                    ({restaurant.reviews || "1.5"} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Clock size={20} />
                  <span>{restaurant.deliveryTime || "20"} min</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  {restaurant.country == "India" ? (
                    <IndianRupee size={20} />
                  ) : (
                    <DollarSign size={20} />
                  )}
                  <span>
                    {restaurant.deliveryFee
                      ? restaurant.deliveryFee
                      : restaurant.country == "India"
                      ? "100"
                      : "2.5"}
                  </span>
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
          {restaurant.menu.map((item: any) => (
            // console.log("Menu item image:", item),
            <MenuItem
              key={item._id}
              countryCode={restaurant.country == "India" ? "IN" : "US"}
              item={item}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

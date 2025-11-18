"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/header";
import RestaurantCard from "@/components/restaurant-card";
import SearchBar from "@/components/search-bar";
import { restaurants } from "@/lib/mock-data";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";

export default function Home() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/restaurants");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    "fast-food",
    "pizza",
    "asian",
    "mexican",
    "dessert",
  ];

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-neutral-900 text-balance">
            Order delicious food delivered fast
          </h1>
          <p className="text-neutral-600 text-lg mb-8 max-w-2xl">
            Browse thousands of restaurants and get your favorite food delivered
            to your door
          </p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurants Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-neutral-900">
            Popular Restaurants
          </h2>
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  href={`/restaurant/${restaurant.id}`}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <RestaurantCard restaurant={restaurant} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">
                No restaurants found matching your search
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

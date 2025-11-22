import { Star, MapPin, MoreVertical, Plus } from "lucide-react";
import { restaurants } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

type Restaurant = {
  _id: string;
  name: string;
  cuisine?: string;
  category?: string;
  image?: string;
  menu?: any[];
  country?: string;
};

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/restaurants");
      setRestaurants(res.data || []);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load restaurants"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="p-6">Loading restaurants...</div>;
  if (restaurants.length === 0)
    return <div className="p-6">No restaurants found.</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Restaurants</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Restaurant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{restaurant.name}</h3>
                <p className="text-neutral-600 text-sm mt-1">
                  {restaurant.cuisine}
                </p>
              </div>
              <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <MoreVertical size={18} className="text-neutral-600" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <Star size={16} className="fill-orange-500 text-orange-500" />
                <span className="font-semibold">{restaurant.rating || "4.5"}</span>
                <span className="text-neutral-600 text-sm">
                  ({restaurant.reviews || "1.5K"} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2 text-neutral-600">
                <MapPin size={16} />
                <span className="text-sm">Restaurant {restaurant.id}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-neutral-200">
              <button className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 border border-neutral-200 text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors font-medium">
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

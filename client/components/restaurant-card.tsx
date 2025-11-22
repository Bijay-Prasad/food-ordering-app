import { Star, Clock, DollarSign, IndianRupee } from "lucide-react";

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    country: string;
    cuisine: string;
    rating: number;
    reviews: number;
    deliveryTime: number;
    deliveryFee: number;
    image: string;
    category: string;
  };
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative w-full h-40 bg-neutral-200 overflow-hidden">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-neutral-900 mb-1">
          {restaurant.name}
        </h3>
        <p className="text-sm text-neutral-600 mb-3">{restaurant.cuisine}</p>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-orange-500 text-orange-500" />
            <span className="font-semibold text-sm">
              {restaurant.rating || 4.5}
            </span>
            <span className="text-xs text-neutral-600">
              ({restaurant.reviews || "1.5K"})
            </span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{restaurant.deliveryTime || "20"} min</span>
          </div>
          <div className="flex items-center gap-1">
            {restaurant.country == "India" ? (
              <IndianRupee size={16} />
            ) : (
              <DollarSign size={16} />
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
      </div>
    </div>
  );
}

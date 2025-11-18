import { Star, MapPin, MoreVertical, Plus } from 'lucide-react';
import { restaurants } from '@/lib/mock-data';

export default function RestaurantsList() {
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
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{restaurant.name}</h3>
                <p className="text-neutral-600 text-sm mt-1">{restaurant.cuisine}</p>
              </div>
              <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <MoreVertical size={18} className="text-neutral-600" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <Star size={16} className="fill-orange-500 text-orange-500" />
                <span className="font-semibold">{restaurant.rating}</span>
                <span className="text-neutral-600 text-sm">({restaurant.reviews} reviews)</span>
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

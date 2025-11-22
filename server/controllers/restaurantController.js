const Restaurant = require('../models/Restaurant');

const getRestaurants = async (req, res) => {
    const filter = req.user.role === 'ADMIN' ? {} : { country: req.user.country };
    const restaurants = await Restaurant.find(filter).populate('menu');
    res.json(restaurants);
};

const getRestaurantById = async (req, res) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id).populate('menu');
    if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
};

module.exports = { getRestaurants, getRestaurantById };
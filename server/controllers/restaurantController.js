const Restaurant = require('../models/Restaurant');

const getRestaurants = async (req, res) => {
    const filter = req.user.role === 'ADMIN' ? {} : { country: req.user.country };
    const restaurants = await Restaurant.find(filter).populate('menu');
    res.json(restaurants);
};

module.exports = { getRestaurants };
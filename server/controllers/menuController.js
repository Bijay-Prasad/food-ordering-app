const MenuItem = require('../models/MenuItem');

const getMenuItems = async (req, res) => {
    const menuItems = await MenuItem.find().populate('restaurant');
    res.json(menuItems);
};

module.exports = { getMenuItems };
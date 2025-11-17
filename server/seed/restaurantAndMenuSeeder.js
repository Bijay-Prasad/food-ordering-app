const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

dotenv.config({path: "../.env"});

const seedData = async () => {
    try {
        await connectDB();
        // Clear existing data
        await MenuItem.deleteMany();
        await Restaurant.deleteMany();

        // Restaurants data
        const restaurantsData = [
            {
                name: 'Food Hub India',
                country: 'India',
                menu: [
                    { name: 'Paneer Butter Masala', price: 250 },
                    { name: 'Veg Biryani', price: 180 },
                    { name: 'Masala Dosa', price: 120 }
                ]
            },
            {
                name: 'Tasty Treats India',
                country: 'India',
                menu: [
                    { name: 'Chicken Curry', price: 300 },
                    { name: 'Roti', price: 20 },
                    { name: 'Gulab Jamun', price: 50 }
                ]
            },
            {
                name: 'Burger Palace America',
                country: 'America',
                menu: [
                    { name: 'Cheeseburger', price: 8 },
                    { name: 'Fries', price: 3 },
                    { name: 'Coke', price: 2 }
                ]
            },
            {
                name: 'Pizza Corner America',
                country: 'America',
                menu: [
                    { name: 'Pepperoni Pizza', price: 12 },
                    { name: 'Veggie Pizza', price: 10 },
                    { name: 'Garlic Bread', price: 4 }
                ]
            }
        ];

        // Loop through each restaurant
        for (let r of restaurantsData) {
            // Create restaurant without menu first
            const restaurant = new Restaurant({ name: r.name, country: r.country });
            await restaurant.save();

            // Create menu items and link to restaurant
            const menuItems = r.menu.map(item => ({
                ...item,
                restaurant: restaurant._id
            }));

            const createdMenuItems = await MenuItem.insertMany(menuItems);

            // Link menu items back to restaurant
            restaurant.menu = createdMenuItems.map(item => item._id);
            await restaurant.save();
        }

        console.log('Restaurants and Menu Items seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding restaurant/menu data:', error);
        process.exit(1);
    }
};

seedData();
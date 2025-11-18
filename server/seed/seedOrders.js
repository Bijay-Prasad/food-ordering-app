const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

dotenv.config({path: "../.env"});

const seedOrders = async () => {
    try {
        await connectDB();
        // Clear old orders
        // await Order.deleteMany();

        // Fetch data
        const users = await User.find(); // seeded earlier
        const restaurants = await Restaurant.find().populate('menu'); // needed for menu items

        if (users.length === 0 || restaurants.length === 0) {
            console.log("❌ Error: No users or restaurants found. Seed them first.");
            process.exit(1);
        }

        // Helper: pick random user from same country
        const getRandomUserByCountry = (country) => {
            const filtered = users.filter(u => u.country === country);
            return filtered[Math.floor(Math.random() * filtered.length)];
        };

        // Final order array
        const orderData = [];

        for (let restaurant of restaurants) {
            // pick 2 random items from that restaurant
            const menuItems = restaurant.menu;

            if (menuItems.length < 2) continue;

            const item1 = menuItems[0];
            const item2 = menuItems[1];

            let total = item1.price + item2.price;

            const user = getRandomUserByCountry(restaurant.country);

            orderData.push({
                user: user._id,
                restaurant: restaurant._id,
                country: restaurant.country,
                items: [
                    { menuItem: item1._id, quantity: 1 },
                    { menuItem: item2._id, quantity: 1 }
                ],
                totalAmount: total,
                status: "Pending"
            });
        }

        // Insert orders
        await Order.insertMany(orderData);

        console.log("Orders seeded successfully!");
        process.exit();
    } catch (err) {
        console.error("Error seeding orders:", err);
        process.exit(1);
    }
};

seedOrders();
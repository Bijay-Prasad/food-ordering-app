const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');

dotenv.config();

const seedUsers = async () => {
    try {
        await connectDB();
        await User.deleteMany();

        const users = [
            {
                name: 'Nick Fury',
                email: 'admin@slooze.com',
                password: await bcrypt.hash('admin123', 10),
                role: 'ADMIN',
                country: 'India'
            },
            {
                name: 'Captain Marvel',
                email: 'marvel@slooze.com',
                password: await bcrypt.hash('manager123', 10),
                role: 'MANAGER',
                country: 'India'
            },
            {
                name: 'Thanos',
                email: 'thanos@slooze.com',
                password: await bcrypt.hash('member123', 10),
                role: 'MEMBER',
                country: 'India'
            },
            {
                name: 'Captain America',
                email: 'america@slooze.com',
                password: await bcrypt.hash('manager123', 10),
                role: 'MANAGER',
                country: 'America'
            },
            {
                name: 'Travis',
                email: 'travis@slooze.com',
                password: await bcrypt.hash('member123', 10),
                role: 'MEMBER',
                country: 'America'
            }
        ];

        await User.insertMany(users);
        console.log('Seeded users successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
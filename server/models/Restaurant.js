const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, enum: ['India', 'America'], required: true },
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
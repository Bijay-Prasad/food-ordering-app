const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
            quantity: { type: Number, default: 1 }
        }
    ],
    status: { type: String, enum: ['Pending', 'Paid', 'Cancelled'], default: 'Pending' },
    paymentMethod: { type: String, default: 'Cash' },
    country: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
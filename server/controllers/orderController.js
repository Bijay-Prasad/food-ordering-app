const Order = require('../models/Order');

const createOrder = async (req, res) => {
    const { items, paymentMethod } = req.body;
    const order = new Order({
        user: req.user._id,
        items,
        paymentMethod,
        country: req.user.country
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
};

const getOrders = async (req, res) => {
    const filter = req.user.role === 'ADMIN' ? {} : { country: req.user.country };
    const orders = await Order.find(filter).populate('items.menuItem');
    res.json(orders);
};

const updatePayment = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.paymentMethod = req.body.paymentMethod;
    await order.save();
    res.json(order);
};

const cancelOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = 'Cancelled';
    await order.save();
    res.json(order);
};

module.exports = { createOrder, getOrders, updatePayment, cancelOrder };
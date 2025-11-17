const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updatePayment, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { roleAccess } = require('../middleware/roleMiddleware');

router.post('/', protect, roleAccess(['ADMIN', 'MANAGER', 'MEMBER']), createOrder);
router.get('/', protect, roleAccess(['ADMIN', 'MANAGER', 'MEMBER']), getOrders);
router.put('/payment/:id', protect, roleAccess(['ADMIN']), updatePayment);
router.put('/cancel/:id', protect, roleAccess(['ADMIN', 'MANAGER']), cancelOrder);

module.exports = router;
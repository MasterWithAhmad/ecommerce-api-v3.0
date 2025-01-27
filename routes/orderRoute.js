const express = require('express');
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const Joi = require('joi');

const router = express.Router();

// Validation schema for updating order status
const orderStatusSchema = Joi.object({
  status: Joi.string()
    .valid('Pending', 'Shipped', 'Delivered', 'Cancelled')
    .required(),
});

// Routes
router.post('/', authenticate, createOrder); // Place order (Authenticated user)
router.get('/', authenticate, authorize(['admin']), getAllOrders); // Get all orders (Admin only)
router.get('/user', authenticate, getUserOrders); // Get user orders (Authenticated user)
router.put(
  '/:orderId',
  authenticate,
  authorize(['admin']),  // Only admin can update status
  validateRequest(orderStatusSchema), // Validate request data
  updateOrderStatus
); // Update order status (Admin only)

module.exports = router;

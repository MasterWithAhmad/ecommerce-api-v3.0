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
const { userRateLimiter, adminRateLimiter } = require('../middlewares/rateLimiter'); // Import rate limiter


const router = express.Router();

// Validation schema for updating order status
const orderStatusSchema = Joi.object({
  status: Joi.string()
    .valid('Pending', 'Shipped', 'Delivered', 'Cancelled')
    .required(),
});

// Routes
router.post('/', authenticate,userRateLimiter, createOrder); // Place order (Authenticated user)
router.get('/', authenticate, authorize(['admin']), adminRateLimiter, getAllOrders); // Get all orders (Admin only)
router.get('/user', authenticate,userRateLimiter, getUserOrders); // Get user orders (Authenticated user)
router.put(
  '/:orderId',
  authenticate,
  authorize(['admin']),  // Only admin can update status
  adminRateLimiter,
  validateRequest(orderStatusSchema), // Validate request data
  updateOrderStatus
); // Update order status (Admin only)

module.exports = router;

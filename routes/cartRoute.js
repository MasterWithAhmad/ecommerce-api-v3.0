const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const {
  addToCart,
  getCart,
  updateCart,
  clearCart,
} = require('../controllers/cartController');

const router = express.Router();

router.use(authenticate);

router.post('/', addToCart);
router.get('/', getCart);
router.put('/', updateCart);
router.delete('/', clearCart);

module.exports = router;

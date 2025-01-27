const express = require('express');
const {
  getProducts,
  //getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
// router.get('/:id', getProductById);
router.post('/', authenticate, authorize(['admin']), addProduct);
router.put('/:id', authenticate, authorize(['admin']), updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), deleteProduct);
router.get('/search', searchProducts);

module.exports = router;

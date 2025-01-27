// const express = require('express');
// const {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// } = require('../controllers/productController');
// const { authenticate, authorize } = require('../middlewares/authMiddleware');

// const router = express.Router();

// router.get('/', getProducts);
// router.get('/:id', getProductById);
// router.post('/', authenticate, authorize(['admin']), addProduct);
// router.put('/:id', authenticate, authorize(['admin']), updateProduct);
// router.delete('/:id', authenticate, authorize(['admin']), deleteProduct);

// module.exports = router;


const express = require('express');
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { upload } = require('../utils/fileUpload');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

// Use `upload.single('imgURL')` to handle single file uploads
router.post('/', authenticate, authorize(['admin']), upload.single('imgURL'), addProduct);
router.put('/:id', authenticate, authorize(['admin']), upload.single('imgURL'), updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), deleteProduct);

module.exports = router;



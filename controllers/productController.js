const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new product
// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, stock, imgURL } = req.body;
//     const product = await Product.create({ name, description, price, category, stock, imgURL });
//     res.status(201).json({ message: 'Product created successfully', product });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if a file was uploaded and get its path
    const imgURL = req.file ? req.file.path : null;

    // Create the product
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      imgURL,
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};

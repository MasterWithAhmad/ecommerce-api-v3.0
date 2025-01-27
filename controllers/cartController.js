const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Update quantity if product exists in cart
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // Create a new cart
      cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item
const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      if (quantity === 0) {
        cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
      return res.status(200).json({ message: 'Cart updated successfully', cart });
    }

    res.status(404).json({ message: 'Product not found in cart.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.findOneAndDelete({ user: userId });
    res.status(200).json({ message: 'Cart cleared successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getCart, updateCart, clearCart };

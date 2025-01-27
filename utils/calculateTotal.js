// Calculate total price from cart items
const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };
  
  module.exports = calculateTotal;
  
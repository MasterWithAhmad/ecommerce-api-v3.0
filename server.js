const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/config');
const authRoute = require('./routes/authRoute');
const productRoutes = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const { userRateLimiter } = require('./middlewares/rateLimiter');

app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoute);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);

// Apply rate limiter globally(Optional)
//app.use(userRateLimiter);


// Error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

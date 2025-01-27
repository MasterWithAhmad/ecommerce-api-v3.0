const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/config');
const authRoute = require('./routes/authRoute');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoute);

// Error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

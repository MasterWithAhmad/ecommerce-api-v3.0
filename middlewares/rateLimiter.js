const rateLimit = require('express-rate-limit');

// Create a rate limiter
const createRateLimiter = (windowMs, maxRequests) => {
  return rateLimit({
    windowMs, // Time window for rate limiting (e.g., 15 minutes)
    max: maxRequests, // Max requests allowed in the window
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable X-RateLimit-* headers
  });
};

// Default rate limit for normal users (e.g., 100 requests per 15 minutes)
const userRateLimiter = createRateLimiter(15 * 60 * 1000, 100); 

// Rate limit for admin (e.g., 10 requests per 15 minutes)
const adminRateLimiter = createRateLimiter(15 * 60 * 1000, 10);

module.exports = { userRateLimiter, adminRateLimiter };

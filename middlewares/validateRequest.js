// Middleware for validating request data using Joi
const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      // Extract detailed error messages
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: 'Validation error', errors: errorMessages });
    }
    next();
  };
  
  module.exports = validateRequest;
  
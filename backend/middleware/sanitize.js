const { body, validationResult } = require('express-validator');

// Middleware to sanitize all fields in req.body
const sanitizeMiddleware = [
    body('*').trim().escape(), // Sanitize all fields: trim whitespace and escape HTML
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = sanitizeMiddleware;
const rateLimit = require('express-rate-limit');
const { ForbiddenError } = require('./errors/errors');

exports.limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: () => {
    throw new ForbiddenError('Too many requests, please try again later.');
  },
});

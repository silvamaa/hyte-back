/**
 * A function that logs the incoming requests to the console.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The outgoing response object.
 * @param {Function} next - A function to invoke the next middleware.
 */
const logger = (req, res, next) => {
  console.log('Logger', req.method, req.path);
  next();
};

/**
 * Exports the logger function as the default.
 */
export default logger;

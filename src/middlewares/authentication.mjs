/**
 * Authenticates the user using the JWT token
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @param {import('express').NextFunction} next - The next middleware function
 */
const authenticateToken = (req, res, next) => {
  // console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log('token', token);
  if (!token) {
    return next(customError('Token missing', 401));
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    next(customError('Invalid token', 401));
  }
};

/**
 * Creates a custom error object with status code and message
 * @param {string} message - The error message
 * @param {number} statusCode - The HTTP status code
 * @returns {Error} - The custom error object
 */
const customError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Exports the authenticateToken function
 */
export { authenticateToken, customError };

/**
 * Returns a list of all entries for the currently authenticated user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function in the route's middleware chain
 */
const getEntries = async (req, res, next) => {
  // return only logged in user's own entries
  // - get user's id from token (req.user.user_id)
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    next(new Error(result.error));
  }
};

/**
 * Returns a single entry for the currently authenticated user based on the provided entry ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function in the route's middleware chain
 */
const getEntryById = async (req, res, next) => {
  const entry = await findEntryById(req.params.id, req.user.user_id);
  if (entry) {
    res.json(entry);
  } else {
    next(customError('Entry not found', 404));
  }
};

/**
 * Adds a new entry for the currently authenticated user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function in the route's middleware chain
 */
const postEntry = async (req, res, next) => {
  const userId = req.user.user_id;
  const result = await addEntry(req.body, userId);
  if (result.entry_id) {
    res.status(201);
    res.json({message: 'New entry added.', ...result});
  } else {
    next(new Error(result.error));
  }
};

/**
 * Updates an existing entry for the currently authenticated user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function in the route's middleware chain
 */
const putEntry = async (req, res, next) => {
  const entryId = req.params.id;
  const userId = req.user.user_id;
  const result = await updateEntryById(entryId, userId, req.body);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.status(201).json(result);
};

/**
 * Deletes an entry for the currently authenticated user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function in the route's middleware chain
 */
const deleteEntry = async (req, res, next) => {
  const result = await deleteEntryById(req.params.id, req.user.user_id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};

/**
 * Get a list of all users
 * @returns {object} - JSON object with a list of all users
 */
const getUsers = async (req, res, next) => {
  const result = await listAllUsers();
  if (result.error) {
    return next(customError(result, result.error));
  }
  return res.json(result);
};

/**
 * Get a user by their ID
 * @param {number} id - The ID of the user to retrieve
 * @returns {object} - JSON object with the user information
 */
const getUserById = async (req, res, next) => {
  const result = await selectUserById(req.params.id);
  if (result.error) {
    return next(customError(result, result.error));
  }
  return res.json(result);
};

/**
 * Create a new user
 * @param {object} user - The user information to create
 * @param {string} user.username - The username of the user
 * @param {string} user.password - The password of the user
 * @param {string} user.email - The email of the user
 * @returns {object} - JSON object with the created user information
 */
const postUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const result = await insertUser(
    {
      username,
      email,
      password: hashedPassword,
    },
    next,
  );
  return res.status(201).json(result);
};

/**
 * Update an existing user
 * @param {object} user - The user information to update
 * @param {number} user.userId - The ID of the user to update
 * @param {string} [user.username] - The new username of the user
 * @param {string} [user.password] - The new password of the user
 * @param {string} [user.email] - The new email of the user
 * @returns {object} - JSON object with the updated user information
 */
const putUser = async (req, res, next) => {
  // Get userinfo from req.user object extracted from token
  // Only user authenticated by token can update own data
  // TODO: admin user can update any user (incl. user_level)
  const userId = req.user.user_id;
  const { username, password, email } = req.body;
  // hash password if included in request
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const result = await updateUserById({
    userId,
    username,
    password: hashedPassword,
    email,
  });
  if (result.error) {
    return next(customError(result, result.error));
  }
  return res.status(200).json(result);
};

/**
 * Delete an existing user
 * @param {number} id - The ID of the user to delete
 * @returns {object} - JSON object with the deleted user information
 */
const deleteUser = async (req, res, next) => {
  try {
    // Check user's authorization here if needed
    const result = await deleteUserById(req.params.id);
    if (result.error) {
      return next(customError(result, result.error));
    }
    return res.json(result);
  } catch (error) {
    console.error("Error deleting user: ", error);
    return next(customError("Internal server error", 500));
  }
};

export { getUsers, getUserById, postUser, putUser, deleteUser };

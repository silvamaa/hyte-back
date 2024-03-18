/**
 * @file Defines the routes for the user resource
 */

import express from 'express';
import { body, param } from 'express-validator';
import {
  /**
   * @function getUserById
   * @description Retrieves a user based on their ID
   * @param {number} id - The ID of the user to retrieve
   * @returns {object} The user with the specified ID
   */
  getUserById,
  /**
   * @function getUsers
   * @description Retrieves a list of all users
   * @returns {object[]} An array of all users
   */
  getUsers,
  /**
   * @function postUser
   * @description Creates a new user
   * @param {string} username - The username of the new user
   * @param {string} password - The password of the new user
   * @param {string} email - The email of the new user
   * @returns {object} The newly created user
   */
  postUser,
  /**
   * @function putUser
   * @description Updates an existing user
   * @param {number} id - The ID of the user to update
   * @param {string} [username] - The new username of the user
   * @param {string} [password] - The new password of the user
   * @param {string} [email] - The new email of the user
   * @returns {object} The updated user
   */
  putUser,
  /**
   * @function deleteUser
   * @description Deletes an existing user
   * @param {number} id - The ID of the user to delete
   * @returns {object} The deleted user
   */
  deleteUser,
} from '../controllers/user-controller.mjs';
import {
  /**
   * @function authenticateToken
   * @description Authenticates the request using an access token
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware function
   * @returns {boolean} Whether the request was authenticated or not
   */
  authenticateToken,
  /**
   * @function validationErrorHandler
   * @description Handles errors from validation middleware
   * @param {object} err - The error object
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware function
   */
  validationErrorHandler,
} from '../middlewares/authentication.mjs';

const userRouter = express.Router();

// /api/user endpoint
userRouter
 .route('/')
  // list users
 .get(authenticateToken, getUsers)
  // update user
 .put(
    authenticateToken,
    body('username', 'username must be 3-20 characters long and alphanumeric')
     .trim()
     .isLength({ min: 3, max: 20 })
     .isAlphanumeric(),
    body('password', 'minimum password length is 8 characters')
     .trim()
     .isLength({ min: 8, max: 128 }),
    body('email', 'must be a valid email address')
     .trim()
     .isEmail()
     .normalizeEmail(),
    validationErrorHandler,
    putUser,
  )
  // user registration
 .post(
    body('username', 'username must be 3-20 characters long and alphanumeric')
     .trim()
     .isLength({ min: 3, max: 20 })
     .isAlphanumeric(),
    body('password', 'minimum password length is 8 characters')
     .trim()
     .isLength({ min: 8, max: 128 }),
    body('email', 'must be a valid email address')
     .trim()
     .isEmail()
     .normalizeEmail(),
    validationErrorHandler,
    postUser,
  );

// /user/:id endpoint
userRouter
 .route('/:id')
  // get info of a user
 .get(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    getUserById,
  )
  // delete user based on id
 .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteUser,
  );

export default userRouter;

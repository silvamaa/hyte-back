/**
 * @file Defines the routes for the entry resource
 */

import express from 'express';
import { body, param } from 'express-validator';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { validationErrorHandler } from '../middlewares/error-handler.mjs';

/**
 * @module EntryRouter
 */

/**
 * Creates an instance of the entryRouter
 * @constructor
 */
const entryRouter = express.Router();

/**
 * Defines the routes for the entry resource
 */
entryRouter
 .route('/')
 .get(authenticateToken, getEntries)
 .post(
    authenticateToken,
    /**
     * Validates the request body for the post entry route
     * @memberof EntryRouter
     */
    body('mood').optional().trim().isLength({ min: 3, max: 20 }).isString(),
    body('sleep_hours').optional().isInt({ min: 0, max: 24 }),
    body('notes').optional().isString().isLength({ min: 3, max: 300 }),
    validationErrorHandler,
    postEntry
  );

entryRouter
 .route('/:id')
 .get(
    authenticateToken,
    /**
     * Validates the id parameter for the get entry by id route
     * @memberof EntryRouter
     */
    param('id', 'must be an integer').isInt(),
    validationErrorHandler,
    getEntryById
  )
 .put(
    authenticateToken,
    /**
     * Validates the id parameter for the put entry route
     * @memberof EntryRouter
     */
    param('id', 'must be an integer').isInt(),
    /**
     * Disallows the user_id field to be updated
     * @memberof EntryRouter
     */
    body('user_id', 'not allowed').not().exists(),
    body('mood').optional().trim().isLength({ min: 3, max: 20 }).isString(),
    body('sleep_hours').optional().isInt({ min: 0, max: 24 }),
    body('notes').optional().isString().isLength({ min: 3, max: 300 }),
    validationErrorHandler,
    putEntry
  )
 .delete(
    authenticateToken,
    /**
     * Validates the id parameter for the delete entry route
     * @memberof EntryRouter
     */
    param('id', 'must be an integer').isInt(),
    validationErrorHandler,
    deleteEntry
  );

export default entryRouter;

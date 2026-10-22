import express from 'express';
import upload from '../middlewares/upload.middleware.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';


// Controllers
import { addWebsite, requestedFields, getWebsites } from '../controllers/website/index.js';

const websiteRouter = express.Router();

/**
 * @route   GET /api/v1/websites
 * @desc    Get user's websites (pin websites and regular websites)
 * @access  Private
 */
websiteRouter.get('/get', verifyToken('MASproAuth'), getWebsites);


/**
 * @route   POST /api/v1/websites/add
 * @desc    Add a new website
 * @access  Private
 */
websiteRouter.post(
    '/add',
    verifyToken('MASproAuth'),
    upload.fields(requestedFields),
    addWebsite
);


/* ─────────────────────────────────────────────────────────
   Placeholders for upcoming routes:
   - DELETE /:id       -> Remove website
   - PUT/PATCH /:id    -> Edit website
   - PUT/PATCH /arrange -> Arrange websites order
   ───────────────────────────────────────────────────────── */

export default websiteRouter;

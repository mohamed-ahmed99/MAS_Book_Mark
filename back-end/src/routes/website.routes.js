import express from 'express';
import upload from '../middlewares/upload.middleware.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';


// Controllers
import { addWebsite, requestedFields } from '../controllers/website/addWebsite.js';

const websiteRouter = express.Router();

/**
 * @route   POST /api/v1/websites
 * @desc    Add a new website
 * @access  Private
 */


// Optional convenience alias for /add
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

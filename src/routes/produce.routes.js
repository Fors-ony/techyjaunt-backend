import { Router } from 'express';
import { createProduce } from '../farmLink/controllers/produce.controller.js';
import validateProduce from '../middleware/validate.produce.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post(
  '/create',
  authMiddleware,
  upload.single('image'), // <-- multer middleware with Cloudinary storage
  validateProduce,
  asyncHandler(createProduce)
);

export default router;

import { Router } from 'express';
import { validateRequest } from '../middleware/request.validation.js';
import {
  registerBuyerSchema,
  loginBuyerSchema,
} from '../farmLink/requests/buyer.request.js';
import {
  registerBuyerController,
  loginBuyerController,
} from '../farmLink/controllers/buyer.controller.js';
import {
  requestBuyerPasswordResetSchema,
  resetBuyerPasswordSchema,
} from '../farmLink/requests/buyer.request.js';
import {
  forgotBuyerPasswordController,
  resetBuyerPasswordController,
} from '../farmLink/controllers/buyer.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// Register buyer
router.post(
  '/signup',
  validateRequest(registerBuyerSchema),
  registerBuyerController
);

// Login a buyer
router.post('/login', validateRequest(loginBuyerSchema), loginBuyerController);

export default router;

// reset password for user
router.post(
  '/forgot-password',
  authMiddleware,
  validateRequest(requestBuyerPasswordResetSchema),
  forgotBuyerPasswordController
);
router.post(
  '/reset-password',
  authMiddleware,
  validateRequest(resetBuyerPasswordSchema),
  resetBuyerPasswordController
);

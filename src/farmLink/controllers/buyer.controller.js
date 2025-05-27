import { asyncHandler } from '../../lib/asyncHandler.js';
import { BadRequestException } from '../../lib/error-definitions.js';
import { loginBuyer, registerBuyer } from '../services/buyer.service.js';
import { registerBuyerSchema } from '../requests/buyer.request.js';
import {
  requestBuyerPasswordReset,
  resetBuyerPasswordService,
} from '../services/buyer.service.js';

export const registerBuyerController = asyncHandler(async (req, res) => {
  // Validate input
  const { error } = registerBuyerSchema.validate(req.body);
  if (error) {
    throw new BadRequestException(error.details[0].message);
  }

  // Call registration service
  const buyer = await registerBuyer(req.body);

  return res.status(201).json({
    success: true,
    message: 'Successful. Please log in.',
    buyer,
  });
});

export const loginBuyerController = asyncHandler(async (req, res) => {
  const { buyer, token } = await loginBuyer(req.body);
  return res.status(200).json({
    success: true,
    message: `Login successful! Welcome ${buyer.first_name}`,
    token,
  });
});

export const forgotBuyerPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await requestBuyerPasswordReset(email);
  res.status(200).json(result);
});

export const resetBuyerPasswordController = asyncHandler(async (req, res) => {
  const { token, password, confirm_password } = req.body;

  // Basic validation
  if (!token || !password || !confirm_password) {
    return res
      .status(400)
      .json({ message: 'Token and passwords are required' });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  const result = await resetBuyerPasswordService(token, password);
  res.status(200).json(result);
});

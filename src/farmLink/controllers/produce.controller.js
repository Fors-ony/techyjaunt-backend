import { createProduceService } from '../services/produce.service.js';
import { asyncHandler } from '../../lib/asyncHandler.js';

/**
 * @desc Create a new produce
 * @route POST /api/v1/farmers/produce
 * @access Private (Farmer only)
 */
export const createProduce = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: 'Produce image is required' });
  }

  const {
    produce_name,
    category,
    quantity,
    unit,
    price,
    harvest_date,
    location,
    description,
  } = req.body;

  const farmerId = req.user?.id;
  const image_url = req.file?.path;

  const newProduce = await createProduceService({
    produce_name,
    category,
    quantity,
    unit,
    price,
    harvest_date,
    location,
    description,
  });

  return res.status(201).json({
    success: true,
    message: 'Produce created successfully',
    data: newProduce,
  });
};
)
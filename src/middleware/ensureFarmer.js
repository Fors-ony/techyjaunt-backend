import Farmer from '../models/farmer.model.js';

// Ensure the potential user is a farmer
export default async function ensureFarmer(req, res, next) {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const farmer = await Farmer.findByPk(req.user.id);
  if (!farmer) {
    return res.status(403).json({ message: 'Access denied: farmers only' });
  }

  // Attach the full Farmer instance
  next();
}

export const validateRequest = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => ({
      message: detail.message,
    }));
    return res.status(400).json({ errors });
  }

  req.body = value; // sanitized/cleaned
  next();
};

export const successResponse = (res, data, status = 200) => {
  res.status(status).json({
    success: true,
    ...data
  });
};

export const errorResponse = (res, message, status = 400, error = null) => {
  res.status(status).json({
    success: false,
    message,
    error: error?.message || null
  });
};
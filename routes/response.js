exports.success = (req, res, message, statusCode, data) => {
  const code = statusCode || 200;
  res.status(code).json({
    error: null,
    message,
    statusCode: code,
    data,
  });
};

exports.error = (req, res, message, statusCode, details) => {
  const code = statusCode || 500;
  if (details) console.error('[Internal Error]:', details);
  res.status(code).json({
    error: message,
    message: null,
    statusCode: code,
  });
};

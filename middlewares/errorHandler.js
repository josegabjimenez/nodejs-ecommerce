const chalk = require('chalk');

const logError = (err, req, res, next) => {
  if (err.output.statusCode === 500)
    console.error(chalk.bold.red('[Internal Error]:'), chalk.red(err.message));
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status).json({
    error: err.message,
    message: null,
    statusCode: err.status,
  });
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

module.exports = { logError, errorHandler, boomErrorHandler };

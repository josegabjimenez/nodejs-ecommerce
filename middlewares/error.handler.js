const chalk = require('chalk');

const logInternalError = (err, req, res, next) => {
  if (err.isBoom && err.output.statusCode === 500) {
    console.error(chalk.bold.red('[Internal Error]:'), chalk.red(err.message));
  }
  next(err);
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

const sequelizeErrorHandler = (err, req, res, next) => {
  if (err.parent) {
    const { fields, parent } = err;
    res.status(409).json({
      error: parent.detail,
      fields,
    });
  } else {
    next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  res.json({
    message: 'Something failed',
    err: err.message,
  });
};

module.exports = {
  logInternalError,
  errorHandler,
  boomErrorHandler,
  sequelizeErrorHandler,
};

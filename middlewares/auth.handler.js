const boom = require('@hapi/boom');

const authApiKey = (req, res, next) => {
  const apiKey = req.headers['api'];
  if (apiKey === '123') {
    next();
  } else {
    next(boom.unauthorized());
  }
};

//! Deprecated
const checkAdminRole = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized("You don't have permission to access this page."));
  }
};

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden("You don't have permission to access this page."));
    }
  };
};

module.exports = {
  authApiKey,
  checkAdminRole,
  checkRoles,
};

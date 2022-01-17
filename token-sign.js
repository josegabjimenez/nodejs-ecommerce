const jwt = require('jsonwebtoken');

const secret = 'cat123';
const payload = {
  sub: 1,
  name: 'JoseExpire1h',
  role: 'Customer',
};
const jwtConfig = {
  expiresIn: '1h',
};

const generateToken = (payload, secret) => {
  return jwt.sign(payload, secret, jwtConfig);
};

const token = generateToken(payload, secret);

console.log(token);

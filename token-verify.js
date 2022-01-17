const jwt = require('jsonwebtoken');

const secret = 'cat123';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb3NlIiwicm9sZSI6IkN1c3RvbWVyIiwiaWF0IjoxNjQyMzcwNTUzfQ.HhymrSJxIdx1ZWoWgPIZ5shipFx43kP4OC_dMW36q_U';

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);

console.log(payload);

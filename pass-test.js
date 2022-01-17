const bcrypt = require('bcrypt');

const myPass = '123Cat';

const generatePassword = async () => {
  const hashedPassword = await bcrypt.hash(myPass, 10);
  console.log(hashedPassword);
};

generatePassword();

const verifyPassword = async () => {
  const hash = '$2b$10$pjETQCorLGApcWWFv81iOOr2og4owtphmcprkj2tGioK8j.btVWPO';
  const isMatch = await bcrypt.compare(myPass, hash);
  console.log(isMatch);
};

verifyPassword();

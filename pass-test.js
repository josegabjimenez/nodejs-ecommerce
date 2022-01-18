const bcrypt = require('bcrypt');

const myPass = 'soso123789';

// const generatePassword = async () => {
//   const hashedPassword = await bcrypt.hash(myPass, 10);
//   console.log(hashedPassword);
// };

// generatePassword();

const verifyPassword = async () => {
  const hash = '$2b$10$Ys1ui01wjxLzHeYvzGr7BefXgAqJItbmJRCYhAcitcBv92NIdH9Ua';
  const isMatch = await bcrypt.compare(myPass, hash);
  console.log(isMatch);
};

verifyPassword();

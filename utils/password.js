import bcrypt from 'bcrypt';

const hashPassword = (password, callback, saltRounds = 10) => bcrypt.hash(password, saltRounds);
const comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

export {
  hashPassword,
  comparePassword
};

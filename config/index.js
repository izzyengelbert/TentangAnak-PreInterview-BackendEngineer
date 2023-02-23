import dotenv from 'dotenv';
import dbConfig from './dbConfig';
import fs from 'fs';

dotenv.config();

let secret = '';
let secretPublic = '';
let baseHost = `${process.env.HOST}:${process.env.PORT}`

try {
  secret = fs.readFileSync(process.env.SECRET_PATH_PRIVATE, 'ascii');
  secretPublic = fs.readFileSync(process.env.SECRET_PATH_PUBLIC, 'ascii');
} catch (error) {
  console.log('Error:', error.message);
}

export default {
  baseHost,
  port: process.env.PORT || 3000,
  db: { ...dbConfig },
  secret,
  secretPublic
};

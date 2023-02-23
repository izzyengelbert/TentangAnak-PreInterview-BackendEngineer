import enums from './enums';

const ENV = process.env.NODE_ENV || enums.env.DEV;
const currentEnv = () => ENV;

const isDev = (env = ENV) => env === enums.env.DEV;
const isProd = (env = ENV) => env === enums.env.PROD;
const isTest = (env = ENV) => env === enums.env.TEST;

const devLogger = (...message) => {
  if (isDev()) { console.log(...message); }
};

const clone = (v) => JSON.parse(JSON.stringify(v));

module.exports = {
  isDev,
  isProd,
  isTest,
  devLogger,
  currentEnv,
  clone
};

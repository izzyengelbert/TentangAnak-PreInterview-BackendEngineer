import { InternalServerError } from 'http-errors';
import common from '../../utils/common';

const unhandledError = (error) => {
  let newError = error.message;
  if (common.isDev()) {
    newError = error;
  }
  if (!error.statusCode) {
    return new InternalServerError(newError);
  }
  return error;
};

const handleError = (handler) => async (req, res, next) => {
  try {
    await handler(req, res);
    return next();
  } catch (error) {
    return next(unhandledError(error));
  }
};

export default handleError;

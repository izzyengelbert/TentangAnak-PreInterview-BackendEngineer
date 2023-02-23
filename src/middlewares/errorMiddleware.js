const { devLogger } = require('../../utils/common');

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, _) => {
  devLogger(err);
  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message
  });
};

export default errorMiddleware;

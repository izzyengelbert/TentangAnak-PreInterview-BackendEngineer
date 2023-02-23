import createError from 'http-errors';

const { BadRequest } = createError;
const validation = (schema, property, checkFile = false) => async (req, res, next) => {
  try {
    if (checkFile && !req.file) {
      return next(new BadRequest('file is required!'))
    }
    await schema.validateAsync(req[property]);
    return next();
  } catch (error) {
    return next(new BadRequest(error.message));
  }
};

export default validation;

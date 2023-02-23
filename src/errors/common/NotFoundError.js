import createError from 'http-errors';

const { NotFound } = createError;

export default class NotFoundError extends NotFound {
  constructor(entity) {
    super(`${entity} not found!`);
  }
}

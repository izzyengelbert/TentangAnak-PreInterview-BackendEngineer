import Joi from '@hapi/joi';

const authSchema = {
  login: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
};

export default authSchema;

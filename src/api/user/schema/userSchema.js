import Joi from '@hapi/joi';

const userSchema = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  query: Joi.object({
    username: Joi.string().min(12).max(20)
  }),
  createUser: Joi.object({
    username: Joi.string().min(10).max(20).required(),
    password: Joi.string().min(12).max(20).alphanum()
      .required()
  })
};

export default userSchema;

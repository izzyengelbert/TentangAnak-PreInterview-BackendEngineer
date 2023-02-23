import Joi from '@hapi/joi';

const monsterSchema = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  query: Joi.object({
    title: Joi.string(),
    type: Joi.string(),
    premier: Joi.boolean()
  }),
  update: Joi.object({
    title: Joi.string(),
    type: Joi.string(),
    premier: Joi.boolean()
  }),
  create: Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required(),
    premier: Joi.boolean().required()
  })
};

export default monsterSchema;

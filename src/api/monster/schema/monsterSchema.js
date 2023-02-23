import Joi from '@hapi/joi';
import { LIST_OF_MONSTER_CLASSES } from '../../../enums/MonsterClasses';

const monsterSchema = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  query: Joi.object({
    name: Joi.string(),
    types: Joi.string(),
    orderBy: Joi.string().valid('id', 'name'),
    order: Joi.string().valid('ASC', 'DESC').when('orderBy', {
      is: Joi.exist(),
      then: Joi.required()
    }),
    catched: Joi.number().valid(0,1)
  }),
  update: Joi.object({
    name: Joi.string(),
    class: Joi.string().valid(...LIST_OF_MONSTER_CLASSES),
    description: Joi.string(),
    size: Joi.number(),
    weight: Joi.number(),
    hp: Joi.number(),
    attack: Joi.number(),
    defense: Joi.number(),
    speed: Joi.number(),
    types: Joi.string()
  }),
  create: Joi.object({
    name: Joi.string().required(),
    class: Joi.string().valid(...LIST_OF_MONSTER_CLASSES),
    description: Joi.string().required(),
    size: Joi.number().required(),
    weight: Joi.number().required(),
    hp: Joi.number().required(),
    attack: Joi.number().required(),
    defense: Joi.number().required(),
    speed: Joi.number().required(),
    types: Joi.string().required()
  })
};

export default monsterSchema;

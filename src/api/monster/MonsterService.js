import NotFoundError from '../../errors/common/NotFoundError';
import { Op } from 'sequelize';

const ENTITY = 'Monster';

export default class MonsterService {
  constructor(models) {
    this._Monster = models[ENTITY];
    this._File = models.File;
    this._Type = models.Type;
    this._MonsterTypes = models.MonsterTypes;
    this._UserMonsters = models.UserMonsters;
    this._User = models.User;
  }

  getAllMonsters(user, query) {
    const {
      orderBy = null,
      order = 'ASC',
      types = null,
      name = null
    } = query;
    let { catched = null } = query;

    const where = {}
    const orders = []
    const typeWhere = {}
    if (name) {
      where.name = {
        [Op.like]: `%${name}%`
      }
    }
    if (orderBy) {
      orders.push([orderBy, order])
    }
    if (types) {
      const findTypes = types.split(',')
      typeWhere.name = {
        [Op.in]: findTypes
      }
    }
    const include = [
      {
        as: 'types',
        model: this._Type,
        where: typeWhere
      }
    ]
    if (catched !== null && user) {
      if (Boolean(Number(catched))) {
        include.push({
          as: 'users',
          model: this._User,
          where: { id: user.id }
        })
      } else {
        include.push({
          as: 'users',
          model: this._User,
          required: false,
          where: { id: { [Op.ne]: user.id } }
        })
      }
    } else {
      include.push({
        as: 'users',
        model: this._User,
        required: false,
        where: { id: user.id }
      })
    }
    return this._Monster.findAll({
      where,
      order: orders,
      include
    });
  }

  async getMonsterById(id) {
    const monster = await this._Monster.findOne({
      where: { id },
      include: {
        as: 'types',
        model: this._Type
      }
    });
    if (!monster) {
      throw new NotFoundError(ENTITY);
    }
    return monster;
  }

  async deleteMonsterById(id, transaction) {
    const monster = await this._Monster.findOne({ where: { id }, transaction });
    if (!monster) {
      throw new NotFoundError(ENTITY);
    }
    await this._File.destroy({ where: { id: monster.fileId }, transaction })
    await this._Monster.destroy({ where: { id }, transaction })
    return { monster };
  }

  async updateMonsterById(id, payload, file, transaction) {
    const monster = await this._Monster.findOne({
      where: {id },
      include: {
        as: 'types',
        model: this._Type
      },
      transaction
    })
    if (!monster) {
      throw new NotFoundError(ENTITY);
    }
    let fileUpdated;
    if (file) {
      fileUpdated = await this._File.update({
        filename: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype
      }, { where: { id: monster.fileId }, transaction } );
    }
    let updatedTypes;
    if (payload.types) {
      await this._deleteTypes(monster.id, transaction);
      updatedTypes = await this._createTypes(payload.types, monster.id, transaction);
    }
    const monsterUpdated = await this._Monster.update({ ...payload }, { where: { id }, transaction })
    return { updatedTypes, fileUpdated, monsterUpdated };
  }

  async createMonster(payload, newFile, baseHost, transaction) {
    const file = await this._File.createNewFile(newFile, baseHost, transaction);
    payload.filePath = file.filepath;
    payload.fileId = file.id;
    
    const monster = new this._Monster(payload);
    await monster.save({ transaction });
    await this._createTypes(payload.types, monster.id, transaction);

    return monster;
  }

  async _deleteTypes(monsterId, transaction) {
    await this._MonsterTypes.destroy({
      where: {
        monsterId
      },
      transaction
    });
  }

  async _createTypes(newTypes, monsterId, transaction) {
    const types = newTypes.split(',')
    const foundTypes = await this._Type.findAll({
      where: {
        name: { [Op.in]: types }
      }
    })
    if (foundTypes.length !== types.length) {
      throw new NotFoundError('Types');
    }
    await this._MonsterTypes.bulkCreate(
      foundTypes.map(v => ({ typeId: v.id, monsterId })),
      { transaction }
    );
    return foundTypes;
  }

  async catchMonster(id, user, transaction) {
    const monster = await this._Monster.findOne({
      where: { id },
      transaction
    });
    if (!monster) {
      throw new NotFoundError(ENTITY);
    }
    const oldUserMonster = await this._UserMonsters.findOne({
      where: { userId: user.id, monsterId: monster.id },
      attributes: ['id'],
      transaction
    })
    if (oldUserMonster) {
      return this._UserMonsters.destroy({
        where: { id: oldUserMonster.id },
        transaction
      })
    }

    const newUserMonster = new this._UserMonsters({
      monsterId: monster.id,
      userId: user.id
    });
    return newUserMonster.save();
  }
}

import express from 'express';
import HttpStatus from 'http-status-codes';
import handleError from '../../middlewares/handleError';
import validation from '../../middlewares/validation';
import monsterSchema from './schema/monsterSchema';
import accessControl from '../../middlewares/accessControl';
import multer from 'multer';

export default class MonsterController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._service = this._app.locals.services.monsterService;
    this._getMonsters = this._getMonsters.bind(this);
    this._getMonsterByParamId = this._getMonsterByParamId.bind(this);
    this._updateMonsterByParamId = this._updateMonsterByParamId.bind(this);
    this._createMonster = this._createMonster.bind(this);
    this._deleteMonsterByParamId = this._deleteMonsterByParamId.bind(this);
    this._catchMonster = this._catchMonster.bind(this);
  }

  // eslint-disable-next-line max-lines-per-function
  registerRoutes() {
    const baseRoute = '/monsters';
    const resources = '/';
    const document = '/:id';
    const actionCatch = '/:id/catch';
    const upload = multer();
    this._app.use(baseRoute, this._router);
    this._router.get(resources,
      accessControl('GET', baseRoute+resources, this._app),
      validation(monsterSchema.query, 'query'),
      handleError(this._getMonsters));
    this._router.get(
      document,
      accessControl('GET', baseRoute+document, this._app),
      validation(monsterSchema.params, 'params'),
      handleError(this._getMonsterByParamId)
    );
    this._router.delete(
      document,
      accessControl('DELETE', baseRoute+document, this._app),
      validation(monsterSchema.params, 'params'),
      handleError(this._deleteMonsterByParamId)
    );
    this._router.put(
      document,
      upload.single('file'),
      accessControl('PUT', baseRoute+document, this._app),
      validation(monsterSchema.params, 'params'),
      validation(monsterSchema.update, 'body'),
      handleError(this._updateMonsterByParamId)
    );
    this._router.put(
      actionCatch,
      accessControl('PUT', baseRoute+actionCatch, this._app),
      validation(monsterSchema.params, 'params'),
      handleError(this._catchMonster)
    );
    this._router.post(
      resources,
      upload.single('file'),
      accessControl('POST', baseRoute+resources, this._app),
      validation(monsterSchema.create, 'body', true),
      handleError(this._createMonster)
    );
  }

  async _getMonsters(req, res) {
    const Monsters = await this._service.getAllMonsters(req.user, req.query);
    return res.status(HttpStatus.OK).json(Monsters);
  }

  async _getMonsterByParamId(req, res) {
    const monster = await this._service.getMonsterById(req.params.id);

    return res.status(HttpStatus.OK).json(monster);
  }

  async _updateMonsterByParamId(req, res) {
    const transaction = await this._app.locals.db.sequelize.transaction();
    try {
      const monster = await this._service.updateMonsterById(req.params.id, req.body, req.file, transaction);
      await transaction.commit()
      return res.status(HttpStatus.ACCEPTED).json(monster);
    } catch (error) {
      console.log(error);
      await transaction.rollback()

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message }); 
    }
  }

  async _catchMonster(req, res) {
    const transaction = await this._app.locals.db.sequelize.transaction();
    try {
      const monster = await this._service.catchMonster(req.params.id, req.user, transaction);
      await transaction.commit();
      return res.status(HttpStatus.ACCEPTED).json(monster);
    } catch (error) {
      console.log(error);
      await transaction.rollback();

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message }); 
    }
    
  }

  async _createMonster(req, res) {
    const transaction = await this._app.locals.db.sequelize.transaction();
    try {
      const monster = await this._service.createMonster(req.body, req.file, this._app.locals.baseHost, transaction);
      await transaction.commit()
      return res.status(HttpStatus.CREATED).json(monster);
    } catch (error) {
      console.log(error);
      await transaction.rollback()

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message }); 
    }
  }

  async _deleteMonsterByParamId(req, res) {
    const transaction = await this._app.locals.db.sequelize.transaction();
    try {
      const monster = await this._service.deleteMonsterById(req.params.id, transaction);
      await transaction.commit()
      return res.status(HttpStatus.ACCEPTED).json(monster);  
    } catch (error) {
      console.log(error);
      await transaction.rollback()
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message }); 
    }
    
  }
}

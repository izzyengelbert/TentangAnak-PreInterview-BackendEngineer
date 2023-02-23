import express from 'express';
import HttpStatus from 'http-status-codes';
import handleError from '../../middlewares/handleError';
import validation from '../../middlewares/validation';
import fileSchema from './schema/fileSchema';
import accessControl from '../../middlewares/accessControl';

export default class FileController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._service = this._app.locals.services.fileService;
    this._getFiles = this._getFiles.bind(this);
    this._getFileByParamId = this._getFileByParamId.bind(this);
  }

  // eslint-disable-next-line max-lines-per-function
  registerRoutes() {
    const baseRoute = '/files';
    const list = '/';
    const document = '/:id';
    this._app.use(baseRoute, this._router);
    this._router.get(list,
      accessControl('GET', baseRoute+list, this._app),
      validation(fileSchema.query, 'query'),
      handleError(this._getFiles));
    this._router.get(
      document,
      accessControl('GET', baseRoute+document, this._app),
      validation(fileSchema.params, 'params'),
      handleError(this._getFileByParamId)
    );
  }

  async _getFiles(req, res) {
    const Files = await this._service.getAllFiles();
    return res.status(HttpStatus.OK).json(Files);
  }

  async _getFileByParamId(req, res) {
    const file = await this._service.getFileById(req.params.id);

    res.set('Content-Type', file.mimetype);
    return res.status(HttpStatus.OK).send(file.buffer);
  }
}

import express from 'express';
import HttpStatus from 'http-status-codes';
import handleError from '../../middlewares/handleError';
import validation from '../../middlewares/validation';
import userSchema from './schema/userSchema';
import accessControl from '../../middlewares/accessControl';

export default class UserController {
  constructor(app) {
    this._app = app;
    this._router = express.Router();
    this._service = this._app.locals.services.userService;
    this._getUsers = this._getUsers.bind(this);
    this._getUserById = this._getUserById.bind(this);
  }

  registerRoutes() {
    const baseRoute = '/users';
    const resources = '/';
    const document = '/:id';
    this._app.use(baseRoute, this._router);
    this._router.get(
      resources,
      accessControl('GET', baseRoute+resources, this._app),
      validation(userSchema.query, 'query'),
      handleError(this._getUsers)
    );
    this._router.get(
      document,
      accessControl('GET', baseRoute+document, this._app),
      validation(userSchema.params, 'params'),
      handleError(this._getUserById)
    );
  }

  async _getUsers(req, res) {
    const { username } = req.query;
    if (username) {
      const user = await this._service.getUserByUsername(username);
      return res.status(HttpStatus.OK).json(user);
    }
    const users = await this._service.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  async _getUserById(req, res) {
    const user = await this._service.getUserById(req.params.id);

    const response = { status: HttpStatus.CREATED, user };
    return res.status(HttpStatus.OK).json(response);
  }
}

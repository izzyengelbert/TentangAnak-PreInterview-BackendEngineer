import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import config from '../config';
import common from '../utils/common';
import database from '../db/models';
import errorMiddleware from './middlewares/errorMiddleware';

import AuthController from './api/auth/AuthController';
import UserController from './api/user/UserController';
import MonsterController from './api/monster/MonsterController';
import FileController from './api/file/FileController';

import UserService from './api/user/UserService';
import AuthService from './api/auth/AuthService';
import MonsterService from './api/monster/MonsterService';
import FileService from './api/file/FileService';

common.devLogger('STARTING SERVER...\n');

const app = express();
const db = database.connect(config.db[common.currentEnv()]);

app.use(cors());
// Example custom logger
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(morgan('tiny'));

const createServices = (models) => ({
  userService: new UserService(models),
  authService: new AuthService(models),
  monsterService: new MonsterService(models),
  fileService: new FileService(models)
});

const createControllers = () => [
  new UserController(app),
  new AuthController(app),
  new MonsterController(app),
  new FileController(app)
];

const initializeController = () => {
  common.devLogger('Initializing controllers...');
  const controllers = createControllers();
  controllers.forEach((controller) => {
    // console.log(controller);
    controller.registerRoutes();
  });
  common.devLogger('Controllers initialized.\n');
};

// generate db models
const registerDependencies = () => {
  common.devLogger('\nRegistering dependencies...');
  app.locals.db = db;
  app.locals.models = db.models;
  app.locals.baseHost = config.baseHost;
  common.devLogger('Creating services...');
  app.locals.services = createServices(app.locals.models);
  common.devLogger('Services loaded.\n');
};

registerDependencies();

app.use(bodyParser.json());
initializeController();

app.use(errorMiddleware);

export default app;

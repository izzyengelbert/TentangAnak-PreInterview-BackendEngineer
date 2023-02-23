import Server from './src/Server';
import app from './src/app';
import common from './utils/common';

import config from './config';

const server = new Server(app, config);
server.start();
common.devLogger('SERVER STARTED...');

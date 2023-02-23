import http from 'http';
import config from '../config';
import common from '../utils/common';

export default class Server {
  constructor(app) {
    this._app = app;
    this._config = config;
    this._server = null;
  }

  start() {
    const {
      port
    } = this._config;
    this._server = http.createServer(this._app);
    common.devLogger('Listening on port', port);

    this._server.listen(port);
  }

  stop() {
    common.devLogger('Shutting down server...');
    this._server.close(() => {
      common.devLogger('Disconnecting database...');
      this._app.locals.db.sequelize.close();
      common.devLogger('Database disconnected.');
      common.devLogger('Server close.');
    });
  }
}

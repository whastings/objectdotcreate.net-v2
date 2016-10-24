const assetsMiddleware = require('server/middleware/assets');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const configViews = require('server/utils/configViews');
const csrf = require('csurf');
const express = require('express');
const http = require('http');
const initDB = require('server/db/initDB');
const ROUTES = require('./routes');
const userLookup = require('server/middleware/userLookup');

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const IS_DEV = process.env.NODE_ENV === 'development';

exports = module.exports = class ServerManager {
  constructor(options) {
    this.options = options;
    this._connectToDb();

    let app = this.app = express();
    configViews(app);
    applyPreMiddleware(app, this.dbConnection);
    applyRoutes(app);
    if (IS_DEV) {
      app.use(express.static(options.staticDir));
    }
    app.use(this._handleError.bind(this));
    this.server = http.createServer(app);
  }

  startServer(port, callback = undefined) {
    this.server.listen(port, callback);
  }

  stopServer(callback) {
    this.server.close(callback);
  }

  _connectToDb() {
    this.dbConnection = null;
    initDB().then((connection) => this.dbConnection = connection);
  }

  _handleError(error, req, res, next) {
    let errorMessage = `ERROR: ${error.stack}`;
    console.error(errorMessage);

    res.status(500).end(IS_DEV ? errorMessage : '');
    next();
  }
};

function applyPreMiddleware(app, db) {
  app.use(cookieParser(COOKIE_SECRET));
  app.use(bodyParser.json());
  app.use(csrf({
    cookie: {httpOnly: true},
    value: (req) => req.headers['x-csrf-token']
  }));
  app.use(assetsMiddleware);
  app.use(/\/(?!(?:scripts|styles))\w+/, userLookup(db));
}

function applyRoutes(app) {
  Object.keys(ROUTES).forEach((route) => app.use(route, ROUTES[route]));
}

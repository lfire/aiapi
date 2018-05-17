'use strict';

const jsonServer = require('json-server');
const chalk      = require('chalk');

let config = require('./config');
let rules  = require(config.RULES);
let dbFile = require(config.DB_FILE);

let ip   = config.SERVER;
let port = config.PORT;

let server      = jsonServer.create();
let router      = jsonServer.router(dbFile());
let middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

let app = void 0;

function start(cb) {
  server.use((req, res, next) => {
    // res.header('X-Hello', 'World');
    next();
  });

  router.render = (req, res) => {
    res.jsonp({
      code: 0,
      body: res.locals.data
    });
  };

  // server.use('/api', router);
  server.use(jsonServer.rewriter(rules));
  server.use(router);

  app = server.listen({
    host: ip,
    port: port
  }, function () {
    console.log(chalk.blue(` JSON Server is running in http://${ip}:${port}`));
    console.log();
  });

  cb && cb();
}

// start the app
start();


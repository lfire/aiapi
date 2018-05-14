const path       = require('path');
const config     = require('./config');
const jsonServer = require('json-server');
const rules      = require(config.RULES);
const dbFile     = require(config.DB_FILE);

const ip   = config.SERVER;
const port = config.PORT;

const server      = jsonServer.create();
const router      = jsonServer.router(dbFile());
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

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

server.listen({
  host: ip,
  port: port
}, function () {
  console.log(JSON.stringify((jsonServer)));
  console.log(`JSON Server is running in http://${ip}:${port}`);
});
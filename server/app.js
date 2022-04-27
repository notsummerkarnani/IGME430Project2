const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const csrf = require('csurf');

const router = require('./router.js');
const config = require('./config.js');

mongoose.connect(config.connections.mongo, (err) => {
  if (err) {
    console.log('could not connect to database');
    throw err;
  }
});

const redisClient = redis.createClient({
  legacyMode: true,
  url: config.connections.redis,
});
redisClient.connect().catch(console.error);

const app = express();
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false,
}));

app.use('/assets', express.static(path.resolve(config.staticAssets.path)));
app.use('/bulma', express.static(path.resolve(config.staticAssets.bulma)));
app.use(favicon(`${config.staticAssets.path}/img/favicon.png`));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    client: redisClient,
  }),
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());

app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }
  console.log('Missin CSRF token!');
  return false;
});

router(app);

app.listen(config.connections.http.port, (err) => {
  if (err) { throw err; }
  console.log(`Listening on port ${config.connections.http.port}`);
});

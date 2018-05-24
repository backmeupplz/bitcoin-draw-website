const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '/.env'),
});
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const i18n = require('i18n-express');

const app = express();

/** View engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ['en', 'ru', 'de', 'pt', 'es', 'zh-CN', 'fa', 'fr', 'ar', 'ja'],
}));

app.use('/', index);

/** Catch 404 and forward to error handler */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/** Error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
  });
});

module.exports = app;

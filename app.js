const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const config = require('./config');

const routes = require('./routes/index');

const mongoose = require('mongoose');

function dbConnection() {
  
  const url = config.mongoUrl;
  const connect = mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

  connect.then(db => {
    console.log('Database connected successfully');
  }, err => {
    console.error(err);
    process.abort();
  })

}

function configs(app) {

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  app.use(passport.initialize());
}

function secureRedirect(app) {
  app.all('*', (req, res, next) => {
    if (req.secure) {
      return next()
    }
    else {
      res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
    }
  })
}

function App() {
  const app = express();
  
  dbConnection();
  configs(app);
  routes(app);
  secureRedirect(app);

  return app;
}


module.exports = App();

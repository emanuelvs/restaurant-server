
const usersRouter = require('./users');
const promoRouter = require('./promoRouter');
const dishRouter = require('./dishRouter');
const leaderRouter = require('./leaderRouter');
const favoriteRouter = require('./favoriteRoute');

function routes(app) {

  app.use('/users', usersRouter);
  app.use('/dishes', dishRouter);
  app.use('/promotions', promoRouter);
  app.use('/leaders', leaderRouter);
  app.use('/favorites', favoriteRouter);
}

module.exports = routes;

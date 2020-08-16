const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../middlewares/auth');
const jwt = require('../utils/jwt');
const cors = require('../middlewares/cors');
const repository = require('../repositories/users');

router.get('/', cors.restricted,auth.jwt, auth.admin,function(req, res, next) {
  repository.findAll()
  .then(users => {
    res.status(200).json(users)
  }, err => next(err))
  .catch(err => next(err))
});

router.post('/signup', cors.restricted,function(req, res, next) {
  repository.register(req.body)
  .then(() => {
    passport.authenticate('local')(req, res, () => {
      res.status(200).json({success: true, status: 'Resgistration Successful'})
    })
  })
  .catch(err => next(err));
});

router.get('/login',cors.restricted, passport.authenticate('local'), (req, res) => {

  const token = jwt.generate({_id: req.user._id});
  res.status(200).json({success: true, token: token, status: 'You are logged in!'})
})

router.get('/logout',cors.restricted, (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 401;
    next(err)
  }
})

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    const token = jwt.generate({_id: req.user._id});
    res.status(200).json({success: true, token: token, status: 'You are logged in!'})
  }
})

module.exports = router;

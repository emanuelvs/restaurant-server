const repository = require('../repositories/users');
const passport = require('passport');
const jwt = require('../utils/jwt');


const listAll = function(req, res, next) {
    repository.findAll()
    .then(users => {
      res.status(200).json(users)
    }, err => next(err))
    .catch(err => next(err))
}

const signup = function(req, res, next) {
    repository.register(req.body)
    .then(() => {
      passport.authenticate('local')(req, res, () => {
        res.status(200).json({success: true, status: 'Resgistration Successful'})
      })
    })
    .catch(err => next(err));
}

const login = (req, res) => {

    const token = jwt.generate({_id: req.user._id});
    res.status(200).json({success: true, token: token, status: 'You are logged in!'})
}

const logout = (req, res, next) => {
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
  }

const facebookAuth = (req, res) => {
    if (req.user) {
      const token = jwt.generate({_id: req.user._id});
      res.status(200).json({success: true, token: token, status: 'You are logged in!'})
    }
  }

module.exports = {
    listAll,
    signup,
    login,
    logout,
    facebookAuth
}
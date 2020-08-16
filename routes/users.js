const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');
const passport = require('passport');
const { usersController } = require('../controllers');

router.get('/', cors.restricted,auth.jwt, auth.admin, usersController.listAll);

router.post('/signup', cors.restricted, usersController.signup);

router.get('/login',cors.restricted, passport.authenticate('local'), usersController.login)

router.get('/logout',cors.restricted, usersController.logout)

router.get('/facebook/token', passport.authenticate('facebook-token'), usersController.facebookAuth)

module.exports = router;

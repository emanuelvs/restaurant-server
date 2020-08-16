const express = require('express');
const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');
const favoriteRouter = express.Router();
const { favoriteController } = require('../controllers');
const msg = require('../utils/messages')

favoriteRouter.route('/')
.options(cors.restricted, (req, res) => { return res.sendStatus(200) })
.get(cors.all, auth.jwt, favoriteController.listAllAndUser)
.post(cors.restricted, auth.jwt, favoriteController.createFavorites)
.put(cors.restricted, auth.jwt, msg.methodNotSupported)
.delete(cors.restricted, auth.jwt, favoriteController.deleteAll)

favoriteRouter.route('/:dishId')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all, auth.jwt, favoriteController.listAll)
.post(cors.restricted, auth.jwt, favoriteController.createFavorite)
.put(cors.restricted, auth.jwt, msg.methodNotSupported)
.delete(cors.restricted, auth.jwt, favoriteController.deleteOne)

module.exports = favoriteRouter;
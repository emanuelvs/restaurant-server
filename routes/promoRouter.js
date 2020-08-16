const express = require('express');
const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');
const {promoController} = require('../controllers');
const msg = require('../utils/messages');
const promoRouter = express.Router();

promoRouter.route('/')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all, promoController.listAll)
.post(cors.restricted,auth.jwt,auth.admin, promoController.create)
.put(cors.restricted,auth.jwt,auth.admin, msg.methodNotSupported)
.delete(cors.restricted,auth.jwt,auth.admin, promoController.deleteAll);

promoRouter.route('/:promoId')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all, promoController.getOne)
.post(cors.restricted,auth.jwt,auth.admin, msg.methodNotSupported)
.put(cors.restricted,auth.jwt,auth.admin, promoController.update)
.delete(cors.restricted,auth.jwt,auth.admin, promoController.deleteOne);

module.exports = promoRouter;

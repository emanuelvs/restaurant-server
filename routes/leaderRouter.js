const express = require('express');
const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');
const {leaderController} = require('../controllers');
const leaderRouter = express.Router();
const msg = require('../utils/messages')

leaderRouter.route('/')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all, leaderController.listAll)
.post(cors.restricted,auth.jwt,auth.admin, leaderController.create)
.put(cors.restricted,auth.jwt,auth.admin, msg.methodNotSupported)
.delete(cors.restricted,auth.jwt,auth.admin, leaderController.deleteAll);

leaderRouter.route('/:leaderId')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all, leaderController.getOne)
.post(cors.restricted,auth.jwt,auth.admin, msg.methodNotSupported)
.put(cors.restricted,auth.jwt,auth.admin, leaderController.update)
.delete(cors.restricted,auth.jwt,auth.admin, leaderController.deleteOne);

module.exports = leaderRouter;

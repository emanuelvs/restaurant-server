const express = require('express');
const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');
const { dishController } = require('../controllers/index');
const msg = require('../utils/messages');
const dishRouter = express.Router();


dishRouter.route('/')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all, dishController.listAll)
.post(cors.restricted,auth.jwt, auth.admin, dishController.create)
.put(cors.restricted,auth.jwt, auth.admin, msg.methodNotSupported)
.delete(cors.restricted, auth.jwt, auth.admin, dishController.deleteAll);

dishRouter.route('/:dishId')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all, dishController.getOne)
.post(cors.restricted,auth.jwt,auth.admin, msg.methodNotSupported)
.put(cors.restricted,auth.jwt,auth.admin, dishController.update)
.delete(cors.restricted,auth.jwt,auth.admin, dishController.deleteOne);

dishRouter.route('/:dishId/comments')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all, dishController.listComments)
.post(cors.restricted,auth.jwt, dishController.createComment)
.put(cors.restricted,auth.jwt, msg.methodNotSupported)
.delete(cors.restricted,auth.jwt,auth.admin, dishController.deleteAllComments);

dishRouter.route('/:dishId/comments/:commentId')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all, dishController.getOneComment)
.post(cors.restricted,auth.jwt, msg.methodNotSupported)
.put(cors.restricted,auth.jwt, dishController.updateComment)
.delete(cors.restricted,auth.jwt, dishController.deleteOneComment);

module.exports = dishRouter;


const express = require('express');
const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');
const repository = require('../repositories/promotions');

const promoRouter = express.Router();

promoRouter.route('/')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all,(req, res, next) => {
    repository.findAll()
    .then(promotions => {
        res.json(promotions)
    })
    .catch(err => next(err))
})
.post(cors.restricted,auth.jwt,auth.admin,(req,res,next) => {
    repository.create(req.body)
    .then(promotion => {
        res.json(promotion)
    })
    .catch((err) => next(err))
})
.put(cors.restricted,auth.jwt,auth.admin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT Method does not supported')
})
.delete(cors.restricted,auth.jwt,auth.admin,(req, res, next) => {
    repository.removeAll()
    .then(resp => {
        res.json(resp)
    })
    .catch((err) => next(err));
});

promoRouter.route('/:promoId')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all,(req, res, next) => {
    repository.findById(req.params.promoId)
    .then(promotion => {
        res.json(promotion)
    })
    .catch((err) => next(err))
})
.post(cors.restricted,auth.jwt,auth.admin,(req,res,next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /promotions/" + req.params.promoId);
})
.put(cors.restricted,auth.jwt,auth.admin,(req, res, next) => {
    repository.update(req.params.promoId, req.body)
    .then(promotion => {
        res.json(promotion)
    })
    .catch((err) => next(err))
})
.delete(cors.restricted,auth.jwt,auth.admin,(req, res, next) => {
    repository.removeOne(req.params.promoId)
    .then(resp => {
        res.json(resp)
    })
    .catch((err) => next(err));
});

module.exports = promoRouter;

const express = require('express');
const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');
const repository = require('../repositories/leaders');

const leaderRouter = express.Router();

leaderRouter.route('/')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all,(req, res, next) => {
    repository.findAll()
    .then(leaders => {
        res.json(leaders)
    })
    .catch(err => next(err))
})
.post(cors.restricted,auth.jwt,auth.admin,(req,res,next) => {
    repository.create(req.body)
    .then(leader => {
       return  res.json(leader)
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

leaderRouter.route('/:leaderId')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all,(req, res, next) => {
    repository.findById(req.params.leaderId)
    .then(leader => {
        res.json(leader)
    })
    .catch((err) => next(err))
})
.post(cors.restricted,auth.jwt,auth.admin,(req,res,next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.leaderId);
})
.put(cors.restricted,auth.jwt,auth.admin,(req, res, next) => {
    repository.update(req.params.leaderId, req.body)
    .then(leader => {
        res.json(leader)
    })
    .catch((err) => next(err))
})
.delete(cors.restricted,auth.jwt,auth.admin,(req, res, next) => {
    repository.removeOne(req.params.leaderId)
    .then(resp => {
        res.json(resp)
    })
    .catch((err) => next(err));
});

module.exports = leaderRouter;

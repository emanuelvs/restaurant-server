const express = require('express');
const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');
const repository = require('../repositories/favorites')
const favoriteRouter = express.Router();


favoriteRouter.route('/')
.options(cors.restricted, (req, res) => { return res.sendStatus(200) })
.get(cors.all, auth.jwt, (req, res, next) => {
    repository.findAllWithUser(req.user._id)
    .then(favorites => {
        res.status(200).json(favorites);
    })
    .catch(err => next(err))
})
.post(cors.restricted, auth.jwt,(req, res, next) => {
    repository.create(req.user._id, req.body)
    .then(result => res.status(201).json(result))
    .catch((err) => next(err));
})
.put(cors.restricted, auth.jwt,(req, res, next) => {
    var err = new Error("PUT operation on '/favorites' not supported");
    err.status = 403;
    next(err);
})
.delete(cors.restricted, auth.jwt,(req, res, next) => {
    repository.removeAll(req.user._id)
    .then(resp => {
        res.status(200).json(resp)
    })
    .catch((err) => next(err));
})

favoriteRouter.route('/:dishId')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all, auth.jwt, (req, res, next) => {
    repository.findAll({user: req.user._id})
    .then(favorites => {
        res.status(200).json(favorites);
    })
    .catch(err => next(err))
})
.post(cors.restricted, auth.jwt,(req, res, next) => {
    repository.createOne(req.user._id, req.params.dishId)
    .then(result => {
        res.status(200).json({success: true, result})
    })
    .catch(err => next(err))
})
.put(cors.restricted, auth.jwt,(req, res, next) => {
    var err = new Error(`PUT operation on '/favorites/${req.params.dishId}' not supported`);
    err.status = 403;
    return next(err);
})
.delete(cors.restricted, auth.jwt,(req, res, next) => {
    repository.removeOne(req.user._id, req.params.dishId)
    .then(result => {
        return res.status(200).json(result)
    })
    .catch(err => next(err))
})

module.exports = favoriteRouter;
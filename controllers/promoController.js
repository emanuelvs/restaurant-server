const repository = require('../repositories/promotions');

const listAll = (req, res, next) => {
    repository.findAll()
    .then(promotions => {
        res.json(promotions)
    })
    .catch(err => next(err))
}

const create = (req,res,next) => {
    repository.create(req.body)
    .then(promotion => {
        res.json(promotion)
    })
    .catch((err) => next(err))
}

const deleteAll = (req, res, next) => {
    repository.removeAll()
    .then(resp => {
        res.json(resp)
    })
    .catch((err) => next(err));
}

const getOne = (req, res, next) => {
    repository.findById(req.params.promoId)
    .then(promotion => {
        res.json(promotion)
    })
    .catch((err) => next(err))
}

const update = (req, res, next) => {
    repository.update(req.params.promoId, req.body)
    .then(promotion => {
        res.json(promotion)
    })
    .catch((err) => next(err))
}

const deleteOne = (req, res, next) => {
    repository.removeOne(req.params.promoId)
    .then(resp => {
        res.json(resp)
    })
    .catch((err) => next(err));
}

module.exports = {
    listAll,
    create,
    deleteAll,
    getOne,
    update,
    deleteOne
}
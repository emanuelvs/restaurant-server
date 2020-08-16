const repository = require('../repositories/leaders');

const listAll = (req, res, next) => {
    repository.findAll()
    .then(leaders => {
        res.json(leaders)
    })
    .catch(err => next(err))
}

const create = (req,res,next) => {
    repository.create(req.body)
    .then(leader => {
       return  res.json(leader)
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
    repository.findById(req.params.leaderId)
    .then(leader => {
        res.json(leader)
    })
    .catch((err) => next(err))
}

const update = (req, res, next) => {
    repository.update(req.params.leaderId, req.body)
    .then(leader => {
        res.json(leader)
    })
    .catch((err) => next(err))
}

const deleteOne = (req, res, next) => {
    repository.removeOne(req.params.leaderId)
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
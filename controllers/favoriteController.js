const repository = require('../repositories/favorites')

const listAllAndUser = (req, res, next) => {
    repository.findAllWithUser(req.user._id)
    .then(favorites => {
        res.status(200).json(favorites);
    })
    .catch(err => next(err))
}

const createFavorites = (req, res, next) => {
    repository.create(req.user._id, req.body)
    .then(result => res.status(201).json(result))
    .catch((err) => next(err));
}

const deleteAll = (req, res, next) => {
    repository.removeAll(req.user._id)
    .then(resp => {
        res.status(200).json(resp)
    })
    .catch((err) => next(err));
}

const listAll = (req, res, next) => {
    repository.findAll({user: req.user._id})
    .then(favorites => {
        res.status(200).json(favorites);
    })
    .catch(err => next(err))
}

const createFavorite = (req, res, next) => {
    repository.createOne(req.user._id, req.params.dishId)
    .then(result => {
        res.status(200).json({success: true, result})
    })
    .catch(err => next(err))
}

const deleteOne = (req, res, next) => {
    repository.removeOne(req.user._id, req.params.dishId)
    .then(result => {
        return res.status(200).json(result)
    })
    .catch(err => next(err))
}

module.exports = {
    listAllAndUser,
    listAll,
    createFavorite,
    createFavorites,
    deleteAll,
    deleteOne
}
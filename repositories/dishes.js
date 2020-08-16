const Dishes = require('../models/dishes')

function findAll() {
    return new Promise((resolve, reject) => {
        Dishes.find({})
        .populate('comments.author')
        .then(resolve)
        .catch(reject)
    })
}

function create(dto) {
    return new Promise((resolve, reject) => {
        Dishes.create(dto)
        .then(resolve)
        .catch(reject)
    })
}

function removeAll() {
    return new Promise((resolve, reject) => {
        Dishes.remove({})
        .then(resolve)
        .catch(reject)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        Dishes.findById(id)
        .populate('comments.author')
        .then(resolve)
        .catch(reject)
    })
}

function updateById(id, dto) {
    return new Promise((resolve, reject) => {
        Dishes.findByIdAndUpdate(id, {
            $set: dto
        }, { new: true })
        .then(resolve)
        .catch(reject)
    })
}

function removeById(id) {
    return new Promise((resolve, reject) => {
        Dishes.findByIdAndRemove(id)
        .then(resolve)
        .catch(reject)
    })
}

module.exports = {
    findAll,
    create,
    removeAll,
    findById,
    removeById,
    updateById
}
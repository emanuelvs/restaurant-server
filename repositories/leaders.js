const Leaders = require('../models/leaders');

function findAll() {

    return new Promise((resolve, reject) => {
        Leaders.find({})
        .then(resolve)
        .catch(reject)
    })
}

function create(dto) {

    return new Promise((resolve, reject) => {
        Leaders.create(dto)
        .then(resolve)
        .catch(reject)
    })
}

function removeAll() {

    return new Promise((resolve, reject) => {
        Leaders.remove({})
        .then(resolve)
        .catch(reject)
    })
}

function findById(leaderId) {

    return new Promise((resolve, reject) => {
        Leaders.findById(leaderId)
        .then(resolve)
        .catch(reject)
    })
}

function update(leaderId, dto) {

    return new Promise((resolve, reject) => {
        Leaders.findByIdAndUpdate(leaderId, {
            $set: dto
        }, { new: true })
        .then(resolve)
        .catch(reject)
    })
}

function removeOne(leaderId) {
    
    return new Promise((resolve, reject) => {
        Leaders.findByIdAndRemove(leaderId)
        .then(resolve)
        .catch(reject)
    })
}

module.exports = {
    findAll,
    create,
    removeAll,
    findById,
    update,
    removeOne
}
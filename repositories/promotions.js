const Promotions = require('../models/promotions');

function findAll() {
    
    return new Promise((resolve, reject) => {
        
        Promotions.find({})
        .then(resolve)
        .catch(reject);
    })
}

function create(dto) {
    
    return new Promise((resolve, reject) => {
        
        Promotions.create(dto)
        .then(resolve)
        .catch(reject);
    })
}

function removeAll() {
    
    return new Promise((resolve, reject) => {
        
        Promotions.remove({})
        .then(resolve)
        .catch(reject);
    })
}

function findById(promoId) {
    
    return new Promise((resolve, reject) => {
        
        Promotions.findById(promoId)
        .then(resolve)
        .catch(reject);
    })
}

function update(promoId, dto) {
    
    return new Promise((resolve, reject) => {
        
        Promotions.findByIdAndUpdate(promoId, {
            $set: dto
        }, { new: true })
        .then(resolve)
        .catch(reject);
    })
}

function removeOne(promoId) {
    
    return new Promise((resolve, reject) => {
        
        Promotions.findByIdAndRemove(promoId)
        .then(resolve)
        .catch(reject);
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
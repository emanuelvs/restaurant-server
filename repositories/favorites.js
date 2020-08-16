const Favorites = require('../models/favorite');

function findAllWithUser(userId) {
    
    return new Promise((resolve, reject) => {
        Favorites.findOne({user: userId})
        .populate('user')
        .populate('dishes')
        .then(resolve)
        .catch(reject)
    })
}

function findAll(userId) {
    return new Promise((resolve, reject) => {
        Favorites.findOne({user: userId})
        .then(resolve)
        .catch(reject)
    })
}

function createOne(userId, dishId) {
    return new Promise((resolve, reject) => {
        findAll(userId)
        .then(favorites => {
        if(favorites != null && favorites.dishes.indexOf(dishId) === -1) {
            favorites.dishes.push(dishId);
            favorites.save()
            .then(result => {
                return resolve(result)
            })
            .catch(reject);
        }
        else {
            var err = new Error('This dish already exists ' + dishId)
            err.status = 403;
            reject(err)
        }
    })
    .catch(reject)
    })
}

function create(userId, dto) {
    
    return new Promise((resolve, reject) => {
        Favorites.findOne({user: userId})
        .populate('dishes.dish')
        .then(favorites => {
            if(favorites != null) {
                dto.forEach(dish => {
                    if(favorites.dishes.id(dish._id) === null) {
                        favorites.dishes.push(dish._id)
                    }     
                });
                favorites.save()
                .then(result => {
                    return resolve({success: true, result})
                })
                .catch(reject);
            }
            else {
                const newFavorites = new Favorites({user: userId});
                dto.forEach(dish => {
                    newFavorites.dishes.push(dish._id)    
                });
                newFavorites.save()
                .then(result => {
                    resolve({success: true, result})
                })
                .catch(reject);
            }
        }, reject)
        .catch(reject);
    })
}

function removeAll(userId) {

    return new Promise((resolve, reject) => {
        return Favorites.remove({user: req.user._id})
        .then(resolve)
        .catch(reject);
    })
}

function removeOne(userId, dishId) {

    return new Promise((resolve, reject) => {
        Favorites.findOne({user: userId})
        .then(favorites => {
            if (favorites != null && favorites.dishes.indexOf(dishId) !== -1) {
                favorites.dishes.pull(dishId)
                favorites.save()
                .then(result => {
                   return resolve(result)
                })
                .catch(reject)
            }
            else {
                var err = new Error('Not found any favorite dish for this user ' + userId, "nothing deleted")
                err.status = 403;
                return reject(err)
            }
        })
        .catch(reject)
    })
}

module.exports = {
    findAll,
    create,
    removeAll,
    createOne,
    removeOne
}
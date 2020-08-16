const User = require('../models/user');

function findAll() {
    return new Promise((resolve, reject) => {
        User.find({})
        .then(resolve)
        .catch(reject)
    })
}

function register(dto) {
    return new Promise((resolve, reject) => {
        User.register(new User({username: dto.username}), dto.password, (err, user) => {
            if (err) {
              return reject(err)
            }
            else {
              if (dto.firstname)
                user.firstname = dto.firstname;
              if (dto.lastname)
                user.lastname = dto.lastname;
              user.save((err, user) => {
                if (err) {
                  return reject(err);
                }
                resolve();
              })
            }
          });
    })
}

module.exports = {
    findAll,
    register
}

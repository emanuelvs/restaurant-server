const express = require('express');
const auth = require('../middlewares/auth');
const cors = require('../middlewares/cors');
const repository = require('../repositories/dishes');

const dishRouter = express.Router();


dishRouter.route('/')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all,(req, res, next) => {
    
    repository.findAll()
    .then(dishes => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dishes)
    }, (err) => next(err))
    .catch(err => next(err))
})
.post(cors.restricted,auth.jwt, auth.admin,(req,res,next) => {
    
    repository.create(req.body)
    .then(dish => {
        res.status(200).json(dish)
    },(err) => next(err))
    .catch((err) => next(err))
})
.put(cors.restricted,auth.jwt, auth.admin,(req, res, next) => {
    return res.status(403).end('PUT Method does not supported')
})
.delete(cors.restricted, auth.jwt, auth.admin,(req, res, next) => {
    repository.removeAll()
    .then(resp => {
        res.status(200).json(resp)
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all,(req, res, next) => {
    repository.findById(req.params.dishId)
    .then(dish => {
        res.status(200).json(dish)
    },(err) => next(err))
    .catch((err) => next(err))
})
.post(cors.restricted,auth.jwt,auth.admin,(req,res,next) => {
    res.status(403).end("POST operation not supported on /dishes/" + req.params.dishId);
})
.put(cors.restricted,auth.jwt,auth.admin,(req, res, next) => {
    repository.updateById(req.params.dishId, req.body)
    .then(dish => {
        res.status(200).json(dish)
    },(err) => next(err))
    .catch((err) => next(err))
})
.delete(cors.restricted,auth.jwt,auth.admin,(req, res, next) => {
    repository.removeById(req.params.dishId)
    .then(resp => {
        res.status(200).json(resp)
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId/comments')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all,(req, res, next) => {
    repository.findById(req.params.dishId)
    .then(dish => {
        if (dish != null) {
            res.status(200).json(dish.comments);
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch(err => next(err))
})
.post(cors.restricted,auth.jwt,(req,res,next) => {
    repository.findById(req.params.dishId)
    .then(dish => {
        if (dish != null) {
            req.body.author = req.user._id;
            dish.comments.push(req.body);
            dish.save()
            .then(dish => {
                res.status(200).json(dish);
            }, (err) => next(err))
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    },(err) => next(err))
    .catch((err) => next(err))
})
.put(cors.restricted,auth.jwt,(req, res, next) => {
    res.status(403).end('PUT Method does not supported')
})
.delete(cors.restricted,auth.jwt,auth.admin,(req, res, next) => {
    repository.findById(req.params.dishId)
    .then(dish => {
        if (dish != null) {
            dish.comments.forEach(comment => {
                dish.comments.id(comment._id).remove();
            });
            dish.save()
            .then(dish => {
                res.json(dish);
            }, (err) => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId/comments/:commentId')
.options(cors.restricted, (req, res) => { res.sendStatus(200) })
.get(cors.all,(req, res, next) => {
    repository.findById(req.params.dishId)
    .then(dish => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            return res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null){
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
        }
    },(err) => next(err))
    .catch((err) => next(err))
})
.post(cors.restricted,auth.jwt,(req,res,next) => {
    res.status(403).end("POST operation not supported on /dishes/" + req.params.dishId + '/comments/' + req.params.commentId);
})
.put(cors.restricted,auth.jwt,(req, res, next) => {
    repository.findById(req.params.dishId)
    .then(dish => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (!dish.comments.id(req.params.commentId).author.equals(req.user._id)){
                var err = new Error('You cannot modify or delete any comments posted by others users');
                err.status = 403;
                return next(err)
            }
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save()
            .then(dish => {
                    res.json(dish);
            }, (err) => next(err))
        }
        else if (dish == null){
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
        }
    },(err) => next(err))
    .catch((err) => next(err))
})
.delete(cors.restricted,auth.jwt,(req, res, next) => {
    repository.findById(req.params.dishId)
    .then(dish => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (!dish.comments.id(req.params.commentId).author.equals(req.user._id)){
                var err = new Error('You cannot modify or delete any comments posted by others users');
                err.status = 403;
                return next(err)
            }
            dish.comments.id(req.params.commentId).remove()
            dish.save()
            .then(dish => {
                res.json(dish);
            }, (err) => next(err));
        }
        else if (dish == null){
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = dishRouter;


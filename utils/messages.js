const express = require('express')

exports.methodNotSupported = (req, res, next) => {

    const method = req.method;
    const url = req.url;
    return res.status(403).json(`${method} Method does not supported on path ${url}`)
}
const express = require('express');
const cors = require('cors');

const domains = [
    'http://localhost:3000', 
    'https://localhost:3443'
]

exports.all = cors();
exports.restricted = cors((req, cb) => {
    cb(null, {
        origin: Boolean(domains.indexOf(req.header('Origin')) !== -1)
    })
});
'use strict';

var server = require('server');

server.get('ShowModal', function(req, res, next) {
    res.render('modal');
    next();
});

module.exports = server.exports();
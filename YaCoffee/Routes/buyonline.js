var express = require('express');
var router = express.Router();
var product = require('../Lib/product.js')

router.get('/loadProducts', function(req, res, next) {
    product.findAll(function(error, products) {
        res.send(products);
    });
});

module.exports = router;

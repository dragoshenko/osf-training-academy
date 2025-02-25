// app_custom/cartridge/controllers/Product.js
'use strict';
var server = require('server');
var base = module.superModule;

server.extend(base);

server.append('Show', function (req, res, next) {
    var ProductMgr = require('dw/catalog/ProductMgr');
    var productId = res.getViewData().product.id;
    var product = ProductMgr.getProduct(productId);
    var suggestedProducts = [];

    if (product.isCategorized()) {
        var CatalogMgr = require('dw/catalog/CatalogMgr');
        var ProductSearchModel = require('dw/catalog/ProductSearchModel');
        var ProductSearch = require('*/cartridge/models/search/productSearch');

        var apiProductSearch = new ProductSearchModel();
        apiProductSearch.setCategoryID(product.getPrimaryCategory().ID);
        apiProductSearch.search();

        var productSearch = new ProductSearch(apiProductSearch,
            req.querystring,
            req.querystring.srule,
            CatalogMgr.getSortingOptions(),
            CatalogMgr.getSiteCatalog().getRoot());

        for (var index = 0; index < 4 && index < productSearch.productIds.length; index++) {
            var suggestedProductId = productSearch.productIds[index].productID;
            var suggestedProduct = ProductMgr.getProduct(suggestedProductId);
            suggestedProducts.push(suggestedProduct);
        }
    }

    var viewData = res.getViewData();
    viewData.suggestedProducts = suggestedProducts;
    res.setViewData(viewData);

    next();
});

module.exports = server.exports();
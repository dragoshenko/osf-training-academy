// app_custom/cartridge/controllers/Product.js
'use strict';
var server = require('server');
var base = module.superModule;

server.extend(base);

server.append('Show', function (req, res, next) {
    var ProductMgr = require('dw/catalog/ProductMgr');
<<<<<<< Updated upstream
=======
    var URLUtils = require('dw/web/URLUtils');
    var Logger = require('dw/system/Logger');

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            suggestedProducts.push(suggestedProduct);
=======

            if (suggestedProduct) {
                // Attempt to retrieve the image
                var image = suggestedProduct.getImage('medium', 0);
                var imageURL = image ? image.getURL().toString() : '/path/to/default/image.jpg';

                // Attempt to retrieve the price
                var price = suggestedProduct.priceModel ? suggestedProduct.priceModel.price.toFormattedString() : 'Price not available';

                var productURL = URLUtils.url('Product-Show', 'pid', suggestedProduct.ID).toString();

                suggestedProducts.push({
                    name: suggestedProduct.name,
                    imageURL: imageURL,
                    price: price,
                    url: productURL
                });

                // Log the suggested product details for debugging
                Logger.info('Suggested Product: {0}', JSON.stringify(suggestedProducts[suggestedProducts.length - 1]));
            }
>>>>>>> Stashed changes
        }
    }

    var viewData = res.getViewData();
    viewData.suggestedProducts = suggestedProducts;
    res.setViewData(viewData);

    next();
});

module.exports = server.exports();
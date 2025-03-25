'use strict';

// Import necessary modules
var server = require('server');
// Extend the Product.js
server.extend(module.superModule);

var ProductMgr = require('dw/catalog/ProductMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var CatalogMgr = require('dw/catalog/CatalogMgr');
var ProductSearch = require('*/cartridge/models/search/productSearch');

/**
 * Retrieves suggested products based on the primary category of the given product.
 * @param {Object} product - The product for which to find suggestions.
 * @param {Object} req - The request object containing query parameters.
 * @returns {Array} An array of suggested products.
 */
function getSuggestedProducts(product, req) {
    var suggestedProducts = [];
    // Check if the product is valid and categorized
    if (product && product.isCategorized()) {
        var apiProductSearch = new ProductSearchModel();
        // Set the category ID for the product search
        apiProductSearch.setCategoryID(product.getPrimaryCategory().ID);
        apiProductSearch.search();

        // Create a new product search instance
        var productSearch = new ProductSearch(
            apiProductSearch,
            req.querystring,
            req.querystring.srule,
            CatalogMgr.getSortingOptions(),
            CatalogMgr.getSiteCatalog().getRoot()
        );

        // Iterate over the first four products in the search results
        for (var index = 0; index < 4; index++) {
            var suggestedProductId = productSearch.productIds[index].productID;
            var suggestedProduct = ProductMgr.getProduct(suggestedProductId);

            // If a suggested product is found, add it to the list
            if (suggestedProduct) {
                suggestedProducts.push({
                    ID: suggestedProduct.ID,
                    image: suggestedProduct
                        .getImage('large', 0)
                        .getURL()
                        .toString(),
                    name: suggestedProduct.getName(),
                    price: {
                        currency: suggestedProduct.getPriceModel().getPrice()
                            .currencyCode,
                        sales: suggestedProduct.getPriceModel().getPrice().value
                    }
                });
            }
        }
    }
    return suggestedProducts;
}

// Define server route
server.append('Show', function (req, res, next) {
    var viewData = res.getViewData(); // Get existing view data
    var productId = viewData.product.id; // Get product ID from view data
    var product = ProductMgr.getProduct(productId);

    // Get suggested products for the current product
    var suggestedProducts = getSuggestedProducts(product, req);

    // Add suggested products to the view data to be sent to the front-end
    res.setViewData({ suggestedProducts: suggestedProducts });
    next(); // Continue to the next middleware
});

// Export the server module
module.exports = server.exports();
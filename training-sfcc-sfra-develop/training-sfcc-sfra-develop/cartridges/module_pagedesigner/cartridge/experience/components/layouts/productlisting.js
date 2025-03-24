'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ProductMgr = require('dw/catalog/ProductMgr');
var Logger = require('dw/system/Logger');

module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    try {
        var products = [];

        if (content.category) {
            var category = ProductMgr.getCategory(content.category);
            if (category) {
                products = category.getProducts().toArray().slice(0, 4); // Get up to 4 products from the category
            }
        } else if (content.productIds) {
            var productIds = content.productIds.split(',').map(function (id) { return id.trim(); });
            products = productIds.map(function (id) {
                return ProductMgr.getProduct(id);
            }).filter(function (product) {
                return product !== null;
            }).slice(0, 4); // Get up to 4 products by ID
        }

        if (products.length > 0) {
            model.products = products;
        } else {
            Logger.warn('No products found for the given category or product IDs.');
        }
    } catch (error) {
        Logger.error('Error fetching products: {0}', error.message);
    }

    return new Template('experience/components/layouts/productlisting').render(model).text;
};
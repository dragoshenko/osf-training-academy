'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ProductMgr = require('dw/catalog/ProductMgr');
var Logger = require('dw/system/Logger');
var URLUtils = require('dw/web/URLUtils');

module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    try {
        var productItems = [];

        if (content.category) {
            var category = ProductMgr.getCategory(content.category);
            if (category) {
                var productIterator = category.getProducts();
                var count = 0;
                while (productIterator.hasNext() && count < 4) {
                    var product = productIterator.next();
                    productItems.push({
                        product: {
                            ID: product.ID,
                            name: product.name,
                            images: product.getImages('medium'),
                            price: {
                                sales: {
                                    formatted: product.getPriceModel().getPrice().toFormattedString()
                                }
                            }
                        },
                        url: URLUtils.url('Product-Show', 'pid', product.ID).toString()
                    });
                    count++;
                }
            }
        } else if (content.productIds) {
            var productIds = content.productIds.split(',').map(function (id) { return id.trim(); });
            productIds.slice(0, 4).forEach(function(id) {
                var product = ProductMgr.getProduct(id);
                if (product) {
                    productItems.push({
                        product: {
                            ID: product.ID,
                            name: product.name,
                            images: product.getImages('medium'),
                            price: {
                                sales: {
                                    formatted: product.getPriceModel().getPrice().toFormattedString()
                                }
                            }
                        },
                        url: URLUtils.url('Product-Show', 'pid', product.ID).toString()
                    });
                }
            });
        }

        if (productItems.length > 0) {
            model.products = productItems;
        } else {
            Logger.warn('No products found for the given category or product IDs.');
        }
    } catch (error) {
        Logger.error('Error fetching products: {0}', error.message);
    }

    return new Template('experience/components/layouts/productlisting').render(model).text;
};
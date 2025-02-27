'use strict';

var server = require('server');
var cartController = module.superModule;

server.extend(cartController);

var BasketMgr = require('dw/order/BasketMgr');
var Site = require('dw/system/Site');
var ContentMgr = require('dw/content/ContentMgr');

server.append('Show', function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentBasket();
    var cartTotalThreshold = Site.current.getCustomPreferenceValue('cartTotalThreshold');
    var contentAssetId = 'cartTotalExceedsMessage'; // Replace with your actual content asset ID
    var OK = false;

    if (currentBasket) {
        var cartTotal = currentBasket.totalGrossPrice.value;
        var contentAsset = ContentMgr.getContent(contentAssetId);

        if (cartTotal >= cartTotalThreshold) {
            OK = true;
        }
    } else {
        res.setStatusCode(500);
        res.json({
            errorMessage: 'No current basket found.'
        });
        return; // Exit to prevent further processing
    }
    res.setViewData({ OK: OK })
    // Proceed with the normal cart rendering
    next();
});


module.exports = server.exports();

'use strict';

var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation');

module.exports = function (context) {
    var content = context.content;
    var category = content.category ? content.category.ID : null;
    var imageUrl = ImageTransformation.url(content.image);

    return {
        imageUrl: imageUrl,
        categoryUrl: category ? dw.catalog.CatalogMgr.getCategory(category).getOnlineURL() : '#'
    };
};
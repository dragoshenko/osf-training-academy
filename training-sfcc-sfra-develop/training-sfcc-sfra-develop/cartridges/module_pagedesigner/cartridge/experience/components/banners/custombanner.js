'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the assets.imagebanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.image) {
        model.image = {
            src: {
                mobile  : ImageTransformation.url(content.image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.image, { device: 'desktop' })
            },
            alt: content.image.file.getAlt()
        };
    }

    if (content.category) {
        model.categoryUrl = content.category.URL;
    }

    return new Template('experience/components/banners/custombanner').render(model).text;
};
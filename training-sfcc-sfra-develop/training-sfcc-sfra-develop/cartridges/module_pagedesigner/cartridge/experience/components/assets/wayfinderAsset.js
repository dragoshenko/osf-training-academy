'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the assets.wayfinderAsset.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    // Transform image for different devices
    if (content.image) {
        model.image = {
            src: {
                mobile: ImageTransformation.url(content.image, { device: 'mobile' }),
                desktop: ImageTransformation.url(content.image, { device: 'desktop' })
            },
            alt: content.image.file.getAlt()
        };
    }

    // Set category URL using URLUtils
    if (content.category) {
        model.categoryUrl = URLUtils.url('Search-Show', 'cgid', content.category.ID);
    } else {
        model.categoryUrl = URLUtils.url('Home-Show');
    }

    // Set title
    if (content.title) {
        model.title = content.title;
    }

    // Render the ISML template for the Wayfinder Asset
    return new Template('experience/components/assets/wayfinderAsset').render(model).text;
};
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.wayfinderLayout.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

    var content = context.content;
    if (content.text_headline) {
        model.text_headline = content.text_headline;
    }
    if (content.image) {
        model.image = content.image;
    }
    if (content.category) {
        model.category = content.category;
    }
    if (content.title) {
        model.title = content.title;
    }

    // Automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    // Render the ISML template for the Wayfinder Layout
    return new Template('experience/components/layouts/wayfinderLayout').render(model).text;
};
exports.$ = exports.jQuery = jQuery = $ = require('jquery').create();
exports.jsdom = jsdom = require('jsdom').jsdom;

exports.Backbone = Backbone = require('backbone');
Backbone.$ = $;

exports.window = window = jsdom().createWindow();

exports.openure = openure = require('openure');
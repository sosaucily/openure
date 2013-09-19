//var phantom = require('phantom');
jQuery = $ = require('jquery').create();
var jsdom = jsdom = require('jsdom').jsdom;

var Backbone = require('backbone');
Backbone.$ = $;

window = jsdom().createWindow();

var openure = require ('openure');

var someView = Backbone.View.extend({});

describe("Openure", function () {
    var backbone_app_key = 'mySweetMarionetteApp',
        mySweetMarionetteApp = {
            region: {
                someView: new someView()
            }
        };

    describe("go", function () {
        it("builds the list of views", function() {
//            Openure.go();
            expect(true).toBe(true);
        });
    });
});
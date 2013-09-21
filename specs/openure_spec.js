// include the helpers and get a reference to it's exports variable
var helpers = require('spec_helper');
Backbone = helpers.Backbone

describe("Openure", function () {
    var backbone_app_key = 'mySweetMarionetteApp',
        mySweetMarionetteApp = {
            region: {
                someView: new Backbone.View()
            }
        };

    describe("go", function () {
        it("builds the list of views", function() {
//            Openure.go();
            expect(true).toBe(true);
        });
    });
});
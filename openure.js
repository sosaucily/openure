Openure = {
    allViews: [],
    currentView: "",
    listener: "",

    findViewsInRegion: function(region) {
        this.findViewsInView(region.currentView);
    },

    findViewsInView: function(view) {
        for(var prop in view) {
            this.findViewsAndRegionsInObject(prop);
        }
        this.allViews.push(view);
    },

    findViewsAndRegionsInObject: function(obj) {
        for(var prop in obj) {

            if (obj[prop] instanceof Backbone.ChildViewContainer) {
                obj[prop].each(function(subview) {
                    this.findViewsInView(subview);
                }, this);
            }
            else if (obj[prop] instanceof Marionette.Region) {
                this.findViewsInRegion(obj[prop]);
            }
            else if (obj[prop] instanceof Marionette.View) {
                this.findViewsInView(obj[prop]);
            }
            else if (obj[prop] instanceof Marionette.Application) {
                this.findViewsAndRegionsInObject(obj[prop]);
            }
        }
    },

    applySelectedView: function() {
        console.log("rock the view - " + Openure.currentView.cid);
        model = this.currentView.model;
        view = this.currentView;
        collection = this.currentView.collection;
        clearInterval(this.listener);
    },

    go: function() {
        this.findViewsAndRegionsInObject(window);

        _.each(this.allViews, function(view) {
            view.$el[0].addEventListener('click', _.bind(function(e) {
                if(e.metaKey && e.shiftKey) {
                    var ownIt = _.bind(this.applySelectedView, this);

                    clearInterval(this.listener);
                    this.listener = setInterval(ownIt, 100);

                    e.preventDefault();
                    this.currentView = view;
                }
            }, this), true);
        }, this);
    }
};

//Openure.go();

var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
//    if (event.source != window)
//        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        port.postMessage(event.data.text);
    }
}, false);
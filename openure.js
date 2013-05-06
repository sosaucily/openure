Openure = {
    allViews: [],
    currentView: "",
    listener: "",
    trackedViewsIDs: [],

    findViewsInRegion: function(region) {
        this.findViewsInView(region.currentView);
    },

    findViewsInView: function(view) {
        if (view.cid && _.lastIndexOf(this.trackedViewsIDs, view.cid) == -1) {
            this.trackedViewsIDs.push(view.cid);
            for(var prop in view) {
                this.findViewsAndRegionsInObject(view[prop]);
            }
            this.allViews.push(view);
        }
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

$(function () {
    Openure.go();
});
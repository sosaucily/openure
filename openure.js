Openure = {
    allViews: [],
    currentView: "",
    listener: "",

    findViewsInRegion: function(region) {
        this.findViewsInView(region.currentView);
    },

    findViewsInView: function(view) {
        for(var prop in view) {
            if (view[prop] instanceof Backbone.ChildViewContainer) {
                view[prop].each(function(subview) {
                    this.findViewsInView(subview);
                }, this);
            } else if (view[prop] instanceof Marionette.Region) {
                this.findViewsInRegion(view[prop]);
            }
        }
        this.allViews.push(view);
    },

    applySelectedView: function() {
        console.log("rock the view - " + Openure.currentView.cid);
        model = this.currentView.model;
        view = this.currentView;
        collection = this.currentView.collection;
        clearInterval(this.listener);
    },

    go: function() {
        for(var prop in Fantasizr) {
            if (Fantasizr[prop] instanceof Marionette.Region) {
                this.findViewsInRegion(Fantasizr[prop]);
            } else if (Fantasizr[prop] instanceof Marionette.View) {
                this.findViewsInView(Fantasizr[prop]);
            }
        }

        _.each(this.allViews, function(view) {
            view.$el[0].addEventListener('click', _.bind(function(e) {
                var ownIt = _.bind(this.applySelectedView, this);

                clearInterval(this.listener);
                this.listener = setInterval(ownIt, 100);

                if(e.metaKey && e.shiftKey) {
                    e.preventDefault();
                    this.currentView = view;
                }
            }, this), true);
        }, this);
    }
};

Openure.go();

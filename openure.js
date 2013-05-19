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

        var jqconsole = document.createElement('div');
        debugger

        var width = this.currentView.$el.css('width') - 5;
        jqconsole.style.cssText = 'position:absolute;width:' + width + 'px'//;height:500px;background-color:black';
        jqconsole.id = "console";

        this.currentView.el.appendChild(jqconsole);

// Creating the console.
        var header = 'Welcome to Openure in JQConsole!\n' +
            'The variable "view" is now in context\n' +
            'here and in the chrome console.\n' +
            'As is model, collection, and options.\n';
        this.jqconsole = $('#console').jqconsole(header, 'JS> ');

// Abort prompt on Ctrl+Z.
        this.jqconsole.RegisterShortcut('Z', function() {
            this.jqconsole.AbortPrompt();
            handler();
        });

// Move to line start Ctrl+A.
        this.jqconsole.RegisterShortcut('A', function() {
            this.jqconsole.MoveToStart();
            handler();
        });

// Move to line end Ctrl+E.
        this.jqconsole.RegisterShortcut('E', function() {
            this.jqconsole.MoveToEnd();
            handler();
        });

        this.jqconsole.RegisterMatching('{', '}', 'brace');
        this.jqconsole.RegisterMatching('(', ')', 'paran');
        this.jqconsole.RegisterMatching('[', ']', 'bracket');

        isObject = function(obj) {
            return obj === Object(obj);
        };

// Handle a command.
        var handler = _.bind(function(command) {
            if (command) {
                try {
                    var result = window.eval(command);
                } catch (e) {
                    this.jqconsole.Write('ERROR: ' + e.message + '\n');
                }
                try {
                    if(isObject(result)) {
                        result = JSON.stringify(result, function(k, v) {
                            return (k === '$el' || k === 'el' || k === '_events' || k === '_listeners') ? undefined : v;
                        }, 2);
                    }
                } catch (e) {
                    if (e.message === 'Converting circular structure to JSON') {
                        this.jqconsole.Write('ERROR: ' + e.message + '\n');
                        this.jqconsole.Write('Please try the same command in the chrome console.\n');
                    }
                    else {
                        this.jqconsole.Write('ERROR: ' + e.message + '\n');
                    }
                }

                this.jqconsole.Write(result);
                this.jqconsole.Write('\n');
            }
            this.jqconsole.Prompt(true, handler, function(command) {
                // Continue line if can't compile the command.
                try {
                    Function(command);
                } catch (e) {
                    if (/[\[\{\(]$/.test(command)) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                return false;
            });
        }, this);

// Initiate the first prompt.
        handler();

        model = this.currentView.model;
        view = this.currentView;
        collection = this.currentView.collection;
        options = this.currentView.options;
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

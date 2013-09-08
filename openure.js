Openure = {
  allViews: [],
  currentView: "",
  listener: "",
  trackedViewsIDs: [],
  previousView: null,
  stackSize: 0,
  maxStackSize: 30,

  findViewsInArray: function(array) {
  //for x in array.len....
    //this.findViewsInView(region.currentView);
  },

  registerView: function(view) {
    if (view.cid && _.lastIndexOf(this.trackedViewsIDs, view.cid) == -1) {
      this.trackedViewsIDs.push(view.cid);
      this.allViews.push(view);
    }
  },

  findViewsInObject: function(obj) {
    this.stackSize++;
    if (this.stackSize < this.maxStackSize) {
      for(var prop in obj) {
        if(obj.nodeName) {
          //this is an html element, and continuing will blow up
          return;
        }

        if (obj[prop] instanceof Backbone.View) {
          this.registerView(obj[prop]);
          this.findViewsInObject(obj[prop]);
        } else if (obj[prop] instanceof Array) {
          this.findViewsInArray(obj[prop]);
        } else if (obj[prop] instanceof Function) {
          //skip
        } else if (obj[prop] instanceof Object) {
          this.findViewsInObject(obj[prop]);
        }
      }
    }
    this.stackSize--;
  },

  applySelectedView: function() {
    clearInterval(this.listener);
    console.log("rock the view - " + this.currentView.cid);

    //Remove the current console when clicking a new one.
    if($('#console').length) {
      this.previousView.el.removeChild($('#console')[0]);
    }

    //For now, close it by clicking the same view again.
    if(this.previousView && this.previousView.cid === this.currentView.cid){
      this.previousView = null;
      return;
    }

    var jqconsole = document.createElement('div');

    var width = this.currentView.$el.css('width');
    width = width.substr(0, width.indexOf('px')); //pull off the px
    var consoleWidth = parseInt(width, 10) - 5;
    jqconsole.style.cssText = 'width:' + consoleWidth + 'px;z-index:99';
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
      var result;
      if (command) {
        try {
          result = window.eval(command);
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
    this.previousView = view;
  },

  go: function() {
    var backbone_app_key;
    var openureKey = $('openure_keys');
    if((openureKey.length < 1 || openureKey.text() === "") && !openure_key){
      console.log('No Openure keys are configured.  Go to the Chrome extensions page and add the key to the Openure options page.');
    }
    else {
        backbone_app_key = openureKey.text() || openure_key;
    }

    console.log('Running Openure against global variable: ' + backbone_app_key);
    this.findViewsInObject(eval(backbone_app_key));

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

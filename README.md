Openure
================================
Openure exposes the internal variables of Backbone Views on a page.

Setup:

1. Expose your backbone app in a global variable.

2. Set that variable name in the Openure extension options at chrome://extensions/ - look for Openure and click - 'options'

Then just CMND-SHIFT-click on a view and the 'view', 'model', and 'collection' variables will be available in the chrome console.

The following variables are defined in the interactive terminal.

* view - the view you clicked
* model - the model of the view, if there is one. Same as typing view.model
* collection - the collection of the view, if there is one.  Same as typing view.collection
* options - the options passed to the view.  Same as typing view.options

Example
-------------------------
You can change the model and call view.render(), or see the state of a view.

Why
-------------------------
It's a hassle to find and drill down into your views from the console.  Going back and adding clogs or debuggers isn't fun either.  Just click and get crazy.

Future Development
-------------------------
For a while we were trying to get a jqconsole to appear and be draggable around the screen.  Making this console as good as Chrome's proved very challenging, so this is on a branch for now.

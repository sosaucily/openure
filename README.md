Openure
================================
Openure exposes the internal variables of Backbone Views on a page.


Setup & Use
-------------------------

1. Expose your backbone app in a global variable. (Flag this off for your Development env only if you'd like)

2. Set that variable name in the Openure extension options at chrome://extensions/ and refresh the page (look for Openure in your extensions and click - 'options')

3. CMND-SHIFT-click on a view.  Notice the view you clicked is highlighted in a lightbox (courtesy of jQuery Spotlight - http://dev7studios.com/portfolio/jquery-spotlight/)

4. In the Chrome JS console, use the 'view', 'model', and 'collection' variables.


Details
-------------------------
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

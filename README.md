Openure
================================
Openure exposes the internal variables of Backbone Views on a page.


Setup & Use
-------------------------

1. Expose your backbone app in a global variable. (Flag this off for your isStaff or Admin group only if you'd like)

2. Set that variable name in the Openure extension options at chrome://extensions/ and refresh the page (look for Openure in your extensions and click - 'options')

3. CMND-SHIFT-click on a view.  Notice the view you clicked is highlighted in a lightbox (courtesy of jQuery Spotlight - http://dev7studios.com/portfolio/jquery-spotlight/)

4. In the Chrome JS console, use the 'view', 'model', 'collection' and 'options' variables.


Details
-------------------------
The following variables are defined in the interactive terminal.

* view - the view you clicked
* model - the model of the view, if there is one. Same as typing view.model
* collection - the collection of the view, if there is one.  Same as typing view.collection
* options - the options passed to the view.  Same as typing view.options

Help
-------------------------
If you see "openure_key is not defined" then go back to setup step 2.

For now, it seems like the Openure Extension Options window needs to remain open :(  Working on it...

Example
-------------------------
You can change the model and call view.render(), or see the state of a view.


Why
-------------------------
It's a hassle to find and drill down into your views from the console.  Going back and adding clogs or debuggers isn't fun either.  Just click and get crazy.

Development (help make me better!)
-------------------------
```git clone```

```npm install``` (from in the openure directory)

To use your local copy of openure.js from within your chrome extension, install the foreman gem and run this command.

```foreman start```

Foreman will run the commands in the Procfile.  Alternatively you can run these directly from two terminal windows.

The first is to host the file on port 9000.  The second is to copy your working copy of openure.js to the hosted directory so you can test your changes as you develop.
They are:

```grunt connect:server:keepalive```
```grunt watch```

Don't forget to check the "Run in local development mode" checkbox in the extension's popup.
To see it, click on the extension icon in chrome.

If you make changes to the core pieces of the extension, rather than the openure.js application file
you will need to do the following to test locally.

* click 'Developer mode' in the chrome extensions page
* click 'Load unpacked extension' and select the openure directory.
* click "reload" on the extensions page next to Openure when you make changes to the extension.

Write tests under the specs folder, and name them *_spec.js

Run specs with:
```grunt shell:jasmine```

Implement feature

pull-request

Bask in the warmth of your generosity. 

Future Development
-------------------------
For a while we were trying to get a jqconsole to appear and be draggable around the screen.  Making this console as good as Chrome's proved very challenging, so this is on a branch for now.

Help make it better!  https://github.com/sosaucily/openure

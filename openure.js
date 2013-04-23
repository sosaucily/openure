myViews = [];

findViewsInRegion = function(region) {
	console.log("region!");
	findViewsInView(region.currentView);
}

findViewsInView = function(view) {
	console.log("view!");
	myViews.push(view);
	for(var prop in view) {
		if (view[prop] instanceof Backbone.ChildViewContainer) {
			view[prop].each(function(subview) {
				findViewsInView(subview);
			});
		} else if (view[prop] instanceof Marionette.Region) {
			findViewsInRegion(view[prop]);
		}
	}
}

for(var prop in Fantasizr) {
debugger
	if (Fantasizr[prop] instanceof Marionette.Region) {
		findViewsInRegion(Fantasizr[prop]);
	} else if (Fantasizr[prop] instanceof Marionette.View) {
		findViewsInView(Fantasizr[prop]);
	}
}

_.each(myViews, function(view) {
	view.$el[0].addEventListener('click', function(e) {
		if(e.metaKey && e.shiftKey) {
			e.stopPropagation();
		    console.log(view);
		}
	}, true);
});

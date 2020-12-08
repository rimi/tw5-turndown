(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;
var TurndownService = require("$:/plugins/rimir/turndown/script.js").TurndownService;

var TurndownWidget = function(parseTreeNode,options) {
    this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
TurndownWidget.prototype = new Widget();

TurndownWidget.prototype.render = function(parent,nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
	this.renderChildren(parent,nextSibling);
};

/*
Compute the internal state of the widget
*/
TurndownWidget.prototype.execute = function() {
	var self = this;
	var theVariableName = this.getAttribute("variable");
	if(!theVariableName){
		theVariableName = "turnedDown";
	}
	var theText = this.getAttribute("text");
	
	var turndownService = new TurndownService({headingStyle:'atx'});
    self.setVariable(theVariableName, turndownService.turndown(theText));
	
	// Construct the child widgets
	this.makeChildWidgets();
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
TurndownWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(Object.keys(changedAttributes).length) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

exports.turndown = TurndownWidget;

})();
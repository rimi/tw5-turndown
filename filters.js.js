/*\
title: $:/core/modules/filters/decodeuricomponent.js
type: application/javascript
module-type: filteroperator


\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter functions
*/

var TurndownService = require("$:/plugins/rimir/turndown/script.js").TurndownService;

exports.turndown = function(source,operator,options) {
	var turndownService = new TurndownService({headingStyle:'atx'});
	var results = [];
	source(function(tiddler,title) {
		var value = title;
		try {
			value = turndownService.turndown(title);
		} catch(e) {
		}
		results.push(value);
	});
	return results;
};

})();

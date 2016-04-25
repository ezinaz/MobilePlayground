(function(){
	'use strict';
	
	angular.module('R2O.Directive')
	.directive('r2oFilterItem', r2oFilterItem);
	
	function r2oFilterItem(){
		return {
			restrict : "E", 
			scope : {
				title : "@"
			},
			template : "        <div>" + 
					   "           <div class='filterCheck'></div>" +
					   "            <h1 class='filterTitle'>{{title}}</h1>" +
				       "        </div>"
		};
	}
})();
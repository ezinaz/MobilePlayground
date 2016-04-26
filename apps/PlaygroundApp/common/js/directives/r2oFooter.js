/**
 * 
 */
(function(){
	'use strict';
	
	angular.module("R2O.Directive")
		.directive('r2oFooter', r2oFooter);
	
	function r2oFooter(){
		return {
			transclude: true,
			restrict : "E", 
			template : "        <div ng-transclude>" +  
				       "        </div>"
		};
	}
})();
/**
 * 
 */
(function(){
	'use strict';
	
	angular.module("R2O.Directive")		
		.directive('r2oContent', r2oContent);
	
	function r2oContent(){
		return {
			transclude: true,
			restrict : "E", 
			template : "        <div ng-transclude class='grid-block vertical'>" +  
				      "        </div>"
		};
	}
})();
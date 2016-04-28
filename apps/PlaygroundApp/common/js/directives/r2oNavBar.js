/**
 * 
 */
(function(){
	'use strict';
	
	angular.module("R2O.Directive")
	.directive('r2oNavBar', r2oNavBar)
	.directive('r2oNavBack', r2oNavBack);
	
	function r2oNavBar(){
		return {
			transclude: true,
			restrict : "E",
			template :"            <div class='pageTitle'>" + 
				      "                {{title}}" + 
				      "            </div>"
		};
	}
	
	r2oNavBack.$inject = ['$rootScope'];
	function r2oNavBack($rootScope){
		return {
			restrict : "A", 
			link: function(scope, element, attrs)
            {
				element.on('click', function(){
                	$rootScope.$broadcast("handleBack");
                });
            }
		};
	}
	
})();
/**
 * 
 */
(function(){
	'use strict';
	
	angular.module("R2O.Directive")		
		.directive('r2oAutoComplete', r2oAutoComplete);
	
	function r2oAutoComplete(){
		return {
			restrict:'A',
            require: "?ngModel",
            scope : {
            	ngModel : "=",
            	minChars : "=",
            	waitTime:"=",
            	onChange : "&"
            },
            link:function(scope,element, attrs){
            		function inputChanged(){
            			clearInterval(scope.timer);
            			scope.onChange();
            			scope.indexAtCallMade = scope.ngModel.length;
            			scope.textAtCallMade = angular.copy(scope.ngModel);
            		}
            		
            		scope.canGetNewData = true;
		            scope.$watch('ngModel', function(){
		            	clearInterval(scope.timer);
		            	
		            	if(scope.indexAtCallMade && scope.ngModel){
		            		if(scope.indexAtCallMade >= scope.ngModel.length && scope.textAtCallMade!=scope.ngModel){
		            			scope.canGetNewData = true;
		            		}else{
		            			scope.canGetNewData = false;
		            		}
		            	}
		            	
		            	if(scope.canGetNewData && scope.ngModel && scope.ngModel.length >= parseInt(scope.minChars || 3)){
		            		scope.timer = setInterval(inputChanged, parseInt(scope.waitTime || 500));
		            	}
		            });
            }
		};
	}
})();
(function(){
	"use strict";
	
	angular.module("R2O.Directive")
		.directive('r2oWebviewBack', r2oWebviewBack)
		.directive('r2oWebviewForward', r2oWebviewForward)
		.directive('r2oWebviewClose', r2oWebviewClose)
		.directive('r2oWebviewOpen', r2oWebviewOpen);
	
		function r2oWebviewBack(){
			return {
				restrict : "A",
				link: function(scope, element, attrs){
						element.on('click', function(){
							window.shopWebViewOverlay.goBack();
		                });
	            	}
			};
		}
		
		function r2oWebviewForward(){
			return {
				restrict : "A",
				link: function(scope, element, attrs){
						element.on('click', function(){
							window.shopWebViewOverlay.goForward();
		                });
	            	}
			};
		}
		
		function r2oWebviewClose(){
			return {
				restrict : "A",
				link: function(scope, element, attrs){
						element.on('click', function(){
							window.shopWebViewOverlay.close();
		                });
	            	}
			};
		}
		
		function r2oWebviewOpen(){
			return {
				restrict : "A",
				link: function(scope, element, attrs){
						element.on('click', function(){
							setTimeout(function(){
								window.shopWebViewOverlay.goToPage(attrs.url);
							}, 200);
		                });
	            	}
			};
		}
})();
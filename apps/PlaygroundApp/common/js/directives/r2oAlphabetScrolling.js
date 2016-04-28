/**
 * 
 */

(function(){
	'use strict';
	
	angular.module("R2O.Directive")		
		.controller('r2oAlphabetScrollingController',r2oAlphabetScrollingController)
		.filter('r2oAddAlphabetClass',r2oAddAlphabetClassFilter)
		.directive('r2oAlphabetScrolling',r2oAlphabetScrolling);

		r2oAlphabetScrollingController.$inject=['$scope'];

		function r2oAlphabetScrollingController($scope){
			$scope.alphabets=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'];
		}

		function r2oAddAlphabetClassFilter(){
			return function(input) {
				if(input.charCodeAt(0)>=65 && input.charCodeAt(0)<=122)
					return input.charAt(0).toUpperCase();
				return '#';
			};
		}

		function r2oAlphabetScrolling(){
			return {
				transclude: true,
				restrict : "E",
				controller:r2oAlphabetScrollingController,
				link: function(scope, element, attr){
					var scrollInElement=document.getElementById(attr.scrollIn);
					function scrollList(event){
						var touchedElement=document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
						try{
							var touchedFirstAlphabetElement=scrollInElement.getElementsByClassName(touchedElement.innerHTML)[0];
							scrollInElement.scrollTop=touchedFirstAlphabetElement.offsetTop - touchedFirstAlphabetElement.parentNode.offsetTop;
							event.preventDefault();
						}
						catch(e){
							event.preventDefault();
						}
					}

					function touchstartCallback(event){
						if(device.version < 4.4){
							scrollInElement.style.cssText = "overflow-y:hidden;";
						}
						scrollList(event);
					}

					function touchmoveCallback(event){
						scrollList(event);
					}

					function touchendCallback(event){
						if(device.version < 4.4){
							scrollInElement.style.cssText = "overflow-y:auto;";
						}
					}

					element[0].ontouchstart=touchstartCallback;
					element[0].ontouchmove=touchmoveCallback;
					element[0].ontouchend=touchendCallback;
				},  
				template : "<div class='alphabet' ng-repeat='alphabet in alphabets'>"+
		    			   "	{{alphabet}}"+
		    			   "</div>"
			};
		}
})();
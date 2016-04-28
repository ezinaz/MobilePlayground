(function(){
	'use strict';
	
	angular.module("R2O.Directive")
		.controller("r2oMenuController", r2oMenuController)
		.directive("r2oMenu",r2oMenu)
		.directive('r2oMenuClose',r2oMenuClose);
	
		r2oMenu.$inject=['$rootScope'];
		r2oMenuController.$inject = ['$scope'];
		
		function r2oMenuController($scope){
			


			$scope.showMenuContent = false;
			$scope.toggleMenu = toggleMenu;
						
			function toggleMenu(){
				$scope.showMenuContent = !$scope.showMenuContent;
				if($scope.opened=='active'){
					$scope.opened='';
					$scope.menuTopClick = '';
					$scope.menuMiddleClick = '';
					$scope.menuBottomClick = '';
					document.getElementsByTagName("r2o-content")[0].ontouchstart = function(){return true;};
				}
				else{
					$scope.opened='active';
					$scope.menuTopClick = 'menu-top-click';
					$scope.menuMiddleClick = 'menu-middle-click';
					$scope.menuBottomClick = 'menu-bottom-click';
					document.getElementsByTagName("r2o-content")[0].ontouchstart = closeMenu;
				}
			}
			
			$scope.$on('close-menu', closeMenu);
			
			
			function closeMenu(){
				$scope.$apply(function(){
					if($scope.showMenuContent){
						$scope.showMenuContent = false;
						$scope.opened='';
						$scope.menuTopClick = '';
						$scope.menuMiddleClick = '';
						$scope.menuBottomClick = '';
						document.getElementsByTagName("r2o-content")[0].ontouchstart = function(){return true;};
					}
				});
			}
					
		}
		
		function r2oMenu($rootScope){
			return {
				restrict : "E",
				controller : "r2oMenuController",
				transclude : true,
				template : "<div ng-show='showMenuContent==true'  class='r2oMenuContent' ng-click='toggleMenu()'>"+
						   "    <div ng-transclude></div>"+
						   "</div>"+
						   "<button r2o-modal-close='filterModal' class='menuButton' ng-click='toggleMenu()'>"+
						   		"<div class='menuToggle'>"+
						            "<span class='menu-global menu-top {{menuTopClick}}'></span>"+
						            "<span class='menu-global menu-middle {{menuMiddleClick}}'></span>"+
						            "<span class='menu-global menu-bottom {{menuBottomClick}}'></span>"+
						        "</div>"+
						   "</button>"
			};
		}
		
		r2oMenuClose.$inject = ['$rootScope'];
		function r2oMenuClose($rootScope){
			return {
				restrict : "A", 
				link: function(scope, element, attrs)
	            {
					element.on('click', function(){
	                	$rootScope.$broadcast("close-menu");
	                });
	            }
			};
		}
})();
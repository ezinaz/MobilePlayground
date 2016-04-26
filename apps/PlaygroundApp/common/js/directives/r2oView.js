/**
 * 
 */
(function(){
	"use strict";
	
	angular.module("playground")
		.controller('r2oViewController', ['$rootScope','$scope','$state', function($rootScope,$scope, $state){
			$rootScope.$broadcast("changeNavTitle",$scope.title);

			$scope.$watch('title', function(newValue, oldValue){
				console.log('title changed', newValue, oldValue);
				$rootScope.$broadcast("changeNavTitle",$scope.title);
			});

		}])
		.directive('r2oView', function(){
			return {
				transclude: true,
				restrict : "E",
				scope : {
					title : "@"
				},
				template : "<div class='primary title-bar'><div class='center title'>{{title}}</div></div>"+
				"<div ng-transclude class='grid-block vertical'>"+
				"</div>",
				controller : "r2oViewController"
			};
		});
})();
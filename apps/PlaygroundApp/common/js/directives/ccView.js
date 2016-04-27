/**
 * 
 */
(function(){
	"use strict";
	
	angular.module("playground")
		.controller('ccViewController', ['$rootScope','$scope','$state', function($rootScope,$scope, $state){
			$rootScope.$broadcast("changeNavTitle",$scope.title);

			$scope.$watch('title', function(newValue, oldValue){
				console.log('title changed', newValue, oldValue);
				$rootScope.$broadcast("changeNavTitle",$scope.title);
			});

		}])
		.directive('ccView', function(){
			return {
				transclude: true,
				restrict : "E",
				scope : {
					title : "@"
				},
				template : "<div class='primary av-custom-title-bar'><div class='center title'><h1>{{title}}</h1></div></div>"+
				"<div ng-transclude class='grid-block vertical'>"+
				"</div>",
				controller : "ccViewController"
			};
		});
})();
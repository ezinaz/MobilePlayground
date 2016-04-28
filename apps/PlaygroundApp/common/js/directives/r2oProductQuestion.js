/**
 * 
 */
(function(){
	'use strict';
	
	angular.module("R2O.Directive")		
		.directive('r2oProductQuestion', r2oProductQuestion);
	
	r2oProductQuestion.$inject = ['$compile', '$http', '$templateCache','$timeout'];
	function r2oProductQuestion($compile, $http, $templateCache,$timeout){
		
		var getTemplate = function(type) {
			var templateUrl = "";
			switch(type){
				case "select" :
					templateUrl = "js/directives/productSpecificQuestionTemplates/questionSelect.html";
					break;
				case "multiSelect" :
					templateUrl = "js/directives/productSpecificQuestionTemplates/questionMultiSelect.html";
					break;
				case "radio" :
					templateUrl = "js/directives/productSpecificQuestionTemplates/questionRadio.html";
					break;
				default :
					templateUrl = "js/directives/productSpecificQuestionTemplates/questionInput.html";
			}
            var templateLoader = $http.get(templateUrl, {cache: $templateCache});

            return templateLoader;
        };
        
        var linker = function(scope, element, attrs){
        	/*scope.currentContract=true;*/
        	scope.blurElementWithId=blurElementWithId;
        	scope.showInViewElementWithId=showInViewElementWithId;
        	
        	var loader = getTemplate(scope.question.questionType);
            loader.success(function(html) {
                element.html(html);
            }).then(function (response) {
                element.replaceWith($compile(element.html())(scope));
            });

            function showInViewElementWithId(id){
            	if(cordova.platformId!="ios"){
            		$timeout(function() { 
						document.getElementById(id).scrollIntoView(true);
					},1000);
            	}
        	}
        	
        	function blurElementWithId(id){
				$timeout(function() { 
					document.getElementById(id).blur();
				});
			}
        };
		
		return {
			restrict : "E",
			scope : {
				question : "=",
				productIndex : "=",
				questionIndex : "=",
				currentContract : "=",
				addOption : "&",
				isOptionAdded: "&"
			},
			link : linker
		};
	}
	
})();
(function(){
	'use strict';
	
	angular.module('R2O.Directive')
	.directive('r2oModal', r2oModal)
	.directive('r2oModalToggle', r2oModalToggle)
	.directive('r2oModalClose',r2oModalClose);
	r2oModal.$inject = ['$rootScope','$timeout'];
	function r2oModal($rootScope, $timeout){
		return {
			transclude: true,
			restrict : "E", 
			scope :{
				touchCallBackMethod:'&'
			},
			link : function(scope, element, attrs){
				if(attrs.useparentfooter != undefined && attrs.useparentfooter == "false"){
					//element.css('z-index',9999);
					scope.useParentFooter = 9999; 
				}else{
					element.css('z-index',99);
					scope.useParentFooter = 99;
				}
				if(attrs.enabletouchclose=="true"){
					element[0].ontouchstart=function(){
						scope.touchCallBackMethod();
					}
				}
				
				scope.$on("toggle-"+attrs.modal, function(){
					$timeout(function(){
						scope.$apply(function(scope){
							if(attrs.showviewheader!="true"){
								if($rootScope.modalShown=='increaseZIndex'){
									$rootScope.modalShown=undefined;
									scope.filterActive = undefined;
								}
								else{
									$rootScope.modalShown='increaseZIndex';
									scope.filterActive = "activeButton";
								}
							}
							scope.show = !scope.show;
							if(device.platform=='iOS'){
								$rootScope.showHeaderOverlay= !$rootScope.showHeaderOverlay;
							}
						});	
					});	
				});
				
				scope.$on('close-'+attrs.modal, function(){
					scope.$apply(function(){
						if(scope.show){
							scope.show = false;
							$rootScope.modalShown=undefined;
							scope.filterActive = undefined;
							$rootScope.showHeaderOverlay=false;
						}
					});
				});
			},
			template : "        <div class='r2oModal' style='z-index:{{useParentFooter}};' class='grid-block vertical' ng-show='show'>" + 
					   "            <div class='r2oModalContent' ng-transclude></div>"+
				       "        </div>"
		};
	}
	
	r2oModalClose.$inject = ['$rootScope'];
	function r2oModalClose($rootScope){
		return {
			restrict : "A", 
			link: function(scope, element, attrs)
            {
				var modal = attrs.r2oModalClose;
				element.on('click', function(){
                	$rootScope.$broadcast("close-"+modal);
                });
            }
		};
	}
	
	r2oModalToggle.$inject = ['$rootScope'];
	function r2oModalToggle($rootScope){
		return {
			restrict : "A", 
			link: function(scope, element, attrs)
            {
				var modal = attrs.r2oModalToggle;
				element.on('click', function(){
                	$rootScope.$broadcast("toggle-"+modal);
                });
            }
		};
	}
	
})();
/**
 * @name LoginCtrl
 * @desc Login controller
 */

angular.module('playground')

    .controller('LoginCtrl', LoginCtrl);


function LoginCtrl($scope, Users, $state) {
    console.log('LoginCtrl: load');

    //BINDABLE VARS
    $scope.loginObject = {};
    $scope.loginObject.logonId = '';
    
    $scope.isLogonError = false;

    //BINDABLE FUNCS
    $scope.setUserDetails = setUserDetails;

    //INTERNAL VARS

    //INTERNAL FUNCS
    function setUserDetails() {
        console.log('login: ', $scope.loginObject);
        $scope.isLogonError = false;
        
        Users.getUser($scope.loginObject.logonId).then(function () {
        	$state.go('app.home');
        }, function() {
        	$scope.isLogonError = true;
        	console.log('Logon error');
        });

        }

    
}

LoginCtrl.$inject = ['$scope','Users','$state'];


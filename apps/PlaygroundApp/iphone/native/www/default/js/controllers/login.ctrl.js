
/* JavaScript content from js/controllers/login.ctrl.js in folder common */
/**
 * @name LoginCtrl
 * @desc Login controller
 */

angular.module('playground')

    .controller('LoginCtrl', LoginCtrl);


function LoginCtrl($scope, setUserDetails) {
    console.log('LoginCtrl: load');

    //BINDABLE VARS
    $scope.loginObject = {};
    $scope.loginObject.logonId = '';

    //BINDABLE FUNCS
    $scope.setUserDetails = setUserDetails;

    //INTERNAL VARS

    //INTERNAL FUNCS
    function setUserDetails() {
        console.log('login: ', $scope.loginObject);
        
        User.setLogonId($scope.loginObject);
       // $state.go(‘app.home’);

        }

    
}

OrdersCtrl.$inject = ['$scope','$state','User'];


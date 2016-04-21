/**
 * @name HomeCtrl
 * @desc Home controller
 */

angular.module('playground')

    .controller('HomeCtrl', HomeCtrl);


function HomeCtrl($scope, Users) {
    console.log('HomeCtrl: load');

    //bindable variables
    $scope.permissions = {};  //TODO: hide/show tools based on permissions

    $scope.tools = [
        {
            name: 'Requests',
            state: 'requests'
        },
        {
            name: 'Orders',
            state: 'orders'
        },
        {
            name: 'Invoices',
            state: 'invoices'
        }
    ];


    
    //internals

    function activate(){
        console.log('HomeCtrl: activate');
        getPermissions();
        //getRoles();
    }

    function getRoles(){
        Users.fetchRoles().then(function(result){
            console.log('HomeCtrl: getRoles: success', result);
        }, function(){
            console.log('HomeCtrl: getRoles: error', result);
        })
    }
    
    function getPermissions() {
    	Users.fetchPermissions().then(function(permissions){
            //console.log('HomeCtrl: getPermissions: success', result);
    		$scope.permissions = permissions;
        }, function(){
            //console.log('HomeCtrl: getPermissions: error', result);
        })    		
    }

    activate();

}

HomeCtrl.$inject = ['$scope', 'Users'];


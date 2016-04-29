/**
 * @name HomeCtrl
 * @desc Home controller
 */

angular.module('playground')

    .controller('HomeCtrl', HomeCtrl);


function HomeCtrl($scope, Users) {
    console.log('HomeCtrl: load');

    //bindable variables
    $scope.permissions = Users.userData.permissions;  //TODO: hide/show tools based on permissions

    $scope.tools = [
        {
            displayname: 'REQUESTS',
            name: 'requests',
            state: 'app.home'
        },
        {
            displayname: 'ORDERS',
            name: 'orders',
            state: 'app.orders'
        }
     
//		  Hiding invoices button for now -- don't forget the comma below when we show it again
//        ,
//        {
//        	displayname: 'INVOICES',
//            name: 'invoices',
//            state: 'app.invoices'
//        }
    ];


    
    //internals

    function activate(){
        console.log('HomeCtrl: activate');
    }

    activate();

}

HomeCtrl.$inject = ['$scope', 'Users'];


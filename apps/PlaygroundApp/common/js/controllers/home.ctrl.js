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
            displayname: 'Requests',
            name: 'requests',
            state: 'app.home'
        },
        {
            displayname: 'Orders',
            name: 'orders',
            state: 'app.orders'
        },
        {
        	displayname: 'Invoices',
            name: 'invoices',
            state: 'app.invoices'
        }
    ];


    
    //internals

    function activate(){
        console.log('HomeCtrl: activate');
    }

    activate();

}

HomeCtrl.$inject = ['$scope', 'Users'];


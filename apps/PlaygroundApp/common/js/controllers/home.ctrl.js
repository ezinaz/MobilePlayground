/**
 * @name HomeCtrl
 * @desc Home controller
 */

angular.module('playground')

    .controller('HomeCtrl', HomeCtrl);


function HomeCtrl($scope) {
    console.log('HomeCtrl: load');

    //bindable variables
    $scope.permissions = {
        requests: true,
        orders: true,
        invoices: false
    };

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


    function checkPermissions(){

    }

}

HomeCtrl.$inject = ['$scope'];


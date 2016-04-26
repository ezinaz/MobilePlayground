/**
 * @name OrdersCtrl
 * @desc Orders controller
 */

angular.module('playground')

    .controller('OrdersCtrl', OrdersCtrl);


function OrdersCtrl($scope, Orders, moment) {
    console.log('OrdersCtrl: load');

    //BINDABLE VARS
    $scope.searchOptions = ['PO', 'ID'];
    $scope.searchObject = {};
    $scope.searchObject.customerId = '';
    $scope.searchObject.customerPo = '';
    $scope.searchObject.searchType = $scope.searchOptions[0];
    $scope.orders = [];
    $scope.moment = moment;

    //BINDABLE FUNCS
    $scope.getOrders = getOrders;

    //INTERNAL VARS

    //INTERNAL FUNCS
    function getOrders() {

        console.log('getOrders: ', $scope.searchObject);

        Orders.fetchOrders($scope.searchObject).then(function (orders) {
            $scope.orders = orders;
        });

    }
}

OrdersCtrl.$inject = ['$scope','Orders','moment'];


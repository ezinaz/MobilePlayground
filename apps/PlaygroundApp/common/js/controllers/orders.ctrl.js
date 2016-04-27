/**
 * @name OrdersCtrl
 * @desc Orders controller
 */

angular.module('playground')

    .controller('OrdersCtrl', OrdersCtrl);


function OrdersCtrl($scope, Orders, moment) {
    console.log('OrdersCtrl: load');

    //BINDABLE VARS
    var searchObject = {};
    searchObject.customerId = '0009000004'; //TODO:  remove hardcoded customer
    $scope.orders = [];
    $scope.moment = moment;

    //BINDABLE FUNCS

    //INTERNAL VARS

    //INTERNAL FUNCS
    function getOrders() {

        console.log('getOrders: ', searchObject);

        Orders.fetchOrders(searchObject).then(function (orders) {
        	
            $scope.orders = orders;
        });

    }
    
    function activate() {
    	getOrders();
    }
    
    activate();
    
}

OrdersCtrl.$inject = ['$scope','Orders','moment'];


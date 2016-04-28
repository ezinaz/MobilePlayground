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

        console.log('getOrders: ', $scope.searchObject);

        Orders.fetchOrders(searchObject).then(function (orders) {
<<<<<<< HEAD
        	
=======
        	for (i = 0; i < orders.length; i++) { 
        	    if (orders[i].StatusCode == 'A') {
        	    	orders[i].StatusCode = 'Open';
        	    }
        	    else if (orders[i].StatusCode == 'B') {
        	    	orders[i].StatusCode = 'Partial';
        	    }
        	    else if (orders[i].StatusCode == 'C') {
        	    	orders[i].StatusCode = 'Closed';
        	    }
        	}
>>>>>>> upstream/master
            $scope.orders = orders;
        });

    }
    
    function activate() {
    	getOrders();
    }
    
    activate();
}

OrdersCtrl.$inject = ['$scope','Orders','moment'];


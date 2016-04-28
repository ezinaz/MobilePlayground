angular.module('playground')

    .factory('Orders', Orders);


/**
 * @name Orders
 * @desc Service for managing Order data
 */

function Orders($q, moment) {

    var service = {};

    //bindables
    service.orders = [];

    service.fetchOrders = fetchOrders;


    //internals


    function fetchOrders(searchObject) {
        var deferred = $q.defer();

        console.log('Orders: fetchOrders: ', searchObject);

        var options = {
        		customerId: searchObject.customerId, 
        		customerPo: searchObject.customerPo, 
        		searchType: searchObject.searchType
        }

        var invocationData = {
            adapter: 'Orders',
            procedure: 'getOrders',
            parameters: [options]
        };

        console.log('Orders: fetchOrders', invocationData);

        WL.Client.invokeProcedure(invocationData, {
            onSuccess: loadFeedsSuccess,
            onFailure: loadFeedsFailure
        });


        function loadFeedsSuccess(result) {
            console.log('Orders: fetchOrders: success', result, result.responseJSON.Envelope.Body.ZqtcSalesorderSearchResponse.Saleorders.item);
            var salesOrders = result.responseJSON.Envelope.Body.ZqtcSalesorderSearchResponse.Saleorders.item;
            for (i=0; i < salesOrders.length;i++) {
            	salesOrders[i].BookDate = moment(salesOrders[i].BookDate, 'YYYY-MM-DD');
            }
            deferred.resolve(salesOrders);
        }

        function loadFeedsFailure(result) {
            console.log('Orders: fetchOrders: error', result);
            deferred.reject(result);
        }


        return deferred.promise;
    }


    return service;
}

Orders.$inject = ['$q', 'moment'];

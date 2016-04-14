/**
 * @name AppCtrl
 * @desc Main app controller
 */

angular.module('playground')

    .controller('AppCtrl', AppCtrl);


function AppCtrl() {

	
	function loadOrders(){
	    
		var request = {
				'urn:ZqtcSalesorderSearch':{
					'CustomerId':'0009000004',
					'CustomerPo':'123',
					'SearchType':'PO'	
				}
		}
		
		
	    var invocationData = {
	            adapter : 'SoapAdapter1',
	            procedure : 'getOrders',
	            parameters : [request]
	        };
		
		console.log('AppCtrl: loadOrders', invocationData);

	    WL.Client.invokeProcedure(invocationData,{
	        onSuccess : loadFeedsSuccess,
	        onFailure : loadFeedsFailure
	    });
	}
	

	function loadFeedsSuccess(result){
	    WL.Logger.debug('Feed retrieve success', result);
	    
	}

	function loadFeedsFailure(result){
	    WL.Logger.error('Feed retrieve failure', result);
	    
	}
	
	loadOrders();

}


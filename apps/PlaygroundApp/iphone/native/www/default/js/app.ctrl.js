
/* JavaScript content from js/app.ctrl.js in folder common */
/**
 * @name AppCtrl
 * @desc Main app controller
 */

angular.module('playground')

    .controller('AppCtrl', AppCtrl);


function AppCtrl() {

	
	function loadOrders(){
	    
		var request = {
				'ZqtcSalesorderSearch':{
					'CustomerId':'0009000004',
					'CustomerPo':'123',
					'SearchType':'PO'	
				}
		}
		
		
	    var invocationData = {
	            adapter : 'Orders',
	            procedure : 'getOrders',
	            parameters : []
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


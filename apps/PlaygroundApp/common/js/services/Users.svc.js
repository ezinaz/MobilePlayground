angular.module('playground')

.factory('Users', Users);

/**
 * @name Users
 * @desc Service for managing User data
 */

function Users($q,$timeout) {

	var service = {};

	//bindables
//	service.userObject = {
//			firstName : '',
//			lastName : '',
//			email : '',
//			userId : '',
//			location: ''
//		};
	
	service.userData = {};

	service.userData.permissions = {
		requests: false,
		orders: false,
		invoices: false
	};

	//bindable methods
	service.getUser = getUser;


	//internals
	var mockRoles = [
		{
			'name': 'R2O_Allow_Submit_Request',
			'description': 'Some description for R2O'
		},
		{
			'name': 'Order_Status_NA',
			'description': 'Some description for orders'
		},
		{
			'name': 'Another_Role',
			'description': 'Some description for another role'
		}
	];
	
	function getUser(logonId) {
		var deferred = $q.defer();
		console.log('Users: getUser: ', logonId);
		
		var invocationData = {
				adapter : 'Users',
				procedure : 'getUser',
				parameters : [ logonId ]
			};		
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : loadSuccess,
			onFailure : loadFailure
		});

		function loadSuccess(result) {
			console.log('Users: getUser: success', result);
			service.userData = result.responseJSON.userData;
			service.userData.permissions = {
					requests: false,
					orders: false,
					invoices: false
			};
			preparePermissions(service.userData.roles);
			deferred.resolve(result);
		}

		function loadFailure(result) {
			console.log('Users: getUser: error', result);
			deferred.reject(result);
		}		
		
		return deferred.promise;
		
	}
	
	// TODO: check if external or internal and model permissions appropriately
	function preparePermissions(rolesArray){
		for(var i = 0; i < rolesArray.length; i++){
			var role = rolesArray[i];
			if(role.name == 'R2O_Allow_Submit_Request'){
				service.userData.permissions.requests = true;
			}
			if(role.name == 'Order_Status_NA'){
				service.userData.permissions.orders = true;
				service.userData.permissions.invoices = true;
			}
		}
		return service.userData.permissions;
	}

	return service;
}

Users.$inject = [ '$q', '$timeout'];
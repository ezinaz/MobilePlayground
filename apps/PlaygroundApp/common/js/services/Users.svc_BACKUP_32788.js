angular.module('playground')

.factory('Users', Users);

/**
 * @name Users
 * @desc Service for managing User data
 */

function Users($q) {

	var service = {};

	//bindables
	service.userObject = {
			firstName : '',
			lastName : '',
<<<<<<< HEAD
			logonId : 'conner.austin@siriuscom.com',
			customerId : ''
=======
			email : '',
			userId : '022498',
			location: 'INTERNAL'
>>>>>>> upstream/master
		};
	
	function setLogonId (loginObject){
		service.loginId = loginObject.logonId;
	}

	service.permissions = {
		requests: false,
		orders: false,
		invoices: false
	};

	//bindable methods
	service.fetchRoles = fetchRoles;
	service.fetchPermissions = fetchPermissions;


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

	function fetchPermissions() {
		var deferred = $q.defer();

		var useMockData = false;
		
		var error = {};

		console.log('Users: getPermissions: ', service.userObject, 'useMockData: ', useMockData);

		if(useMockData){
			getRolesMock();
		}else{
			getRolesRemote();
		}

		function preparePermissions(rolesArray){
			for(var i = 0; i < rolesArray.length; i++){
				var role = rolesArray[i];
				if(role.name == 'R2O_Allow_Submit_Request'){
					service.permissions.requests = true;
				}
				if(role.name == 'Order_Status_NA'){
					service.permissions.orders = true;
					service.permissions.invoices = true;
				}
			}
			return service.permissions;
		}


		function getRolesMock(){
			var permissions = preparePermissions(mockRoles);
			console.log('Users: fetchRoles: permissions', permissions);
			deferred.resolve(permissions);
		}

		function getRolesRemote(){
			var options = service.userObject;

			var invocationData = {
				adapter : 'Users',
				procedure : 'getRoles',
				parameters : [ options ]
			};

			console.log('Users: fetchRoles', invocationData);

			WL.Client.invokeProcedure(invocationData, {
				onSuccess : loadSuccess,
				onFailure : loadFailure
			});

			function loadSuccess(result) {
				console.log('Users: fetchRoles: success', result);
				var roles = result.responseJSON.Envelope.Body.getLdapPersonResponse.getLdapPersonResponse.results.roles;
				console.log('Users: fetchPermissions, loadSuccess: roles', roles);
				var permissions = preparePermissions(roles);
				console.log('Users: fetchPermissions, loadSuccess: permissions', permissions);
				deferred.resolve(permissions);
			}

			function loadFailure(result) {
				console.log('Users: fetchRoles: error', result);
				error.message = 'There was an error';
				deferred.reject(error);
			}
		}

		return deferred.promise;
	}

	function fetchRoles() {
		var deferred = $q.defer();

		var useMockData = false;

		console.log('Users: fetchRoles: ', service.userObject, 'useMockData: ', useMockData);

		if(useMockData){
			getRolesMock();
		}else{
			getRolesRemote();
		}

		function preparePermissions(rolesArray){
			for(var i = 0; i < rolesArray.length; i++){
				var role = rolesArray[i];
				if(role.name == 'R2O_Allow_Submit_Request'){
					service.permissions.requests = true;
				}
				if(role.name == 'Order_Status_NA'){
					service.permissions.orders = true;
				}
			}
			return service.permissions;
		}


		function getRolesMock(){
			var permissions = preparePermissions(mockRoles);
			console.log('Users: fetchRoles: permissions', permissions);
			deferred.resolve(permissions);
		}

		function getRolesRemote(){
			var options = service.userObject;

			var invocationData = {
				adapter : 'Users',
				procedure : 'getRoles',
				parameters : [ options ]
			};

			console.log('Users: fetchRoles', invocationData);

			WL.Client.invokeProcedure(invocationData, {
				onSuccess : loadSuccess,
				onFailure : loadFailure
			});

			function loadSuccess(result) {
				console.log('Users: fetchRoles: success', result);
				deferred.resolve(result);
			}

			function loadFailure(result) {
				console.log('Users: fetchRoles: error', result);
				deferred.reject(result);
			}
		}

		return deferred.promise;
	}

	return service;
}

Users.$inject = [ '$q' ];
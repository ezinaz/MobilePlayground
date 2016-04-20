
/**
 * Note: SOAP 1.1
 * @param options object that includes identifiers for user being searched
 * @returns json list of roles
 */
function getRoles(options) {
	
	
	var path = 'mediator-dev2/ws/getMobLdapPersonVS'
	
	var customerId = options.customerId;
	var firstName = options.firstName;
	var lastName = options.lastName;
	var email = options.email;
	
	var soapRequestString = 
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:get="http://carob1/AvAsapIdentityManagementSystem/Public/getLdapPerson_Wsd">'
			+ '<soap:Header/>'
			+ '<soap:Body>'
				+ '<get:getLdapPerson>'
					+ '<getLdapPersonRequest>'
						+ '<id>' + email + '</id>'
						+ '<firstName>' + firstName + '</firstName>'
						+ '<lastName>' + lastName + '</lastName>'
						+ '<email>' + email + '</email>'
						+ '<retrieveRoles>true</retrieveRoles>'
						+ '<location>EXTERNAL</location>'
					+ '</getLdapPersonRequest>'
				+ '</get:getLdapPerson>'
			+ '</soap:Body>'
		+ '</soap:Envelope>';


	var input = {
	    method : 'post',
	    returnedContentType : 'xml',
	    path : path,
		body : {
			content : soapRequestString,
			contentType : 'text/xml; charset=UTF-8'
		},
		headers : {
	    	SOAPAction : "AvAsapIdentityManagementSystem_Public_getLdapPerson_Wsd_Binder_getLdapPerson"
	    }
	};
	
	WL.Logger.info(input);

	return WL.Server.invokeHttp(input);
}


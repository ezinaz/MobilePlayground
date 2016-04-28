
/**
 * Note: SOAP 1.1
 * @param options object that includes identifiers for user being searched
 * @returns json user data from service getMobLdapPersonVS
 */
function getUser(logonId) {
	
	const INTERNAL = "INTERNAL";
	const EXTERNAL = "EXTERNAL";
	const PATH = 'mediator-test2/ws/getMobLdapPersonVS';
	
	var location = EXTERNAL;
	var isExternal;
	var userFound = false;
	
	// External lookup
	var soapRequestString = getSoapRequestString(logonId, EXTERNAL);
	var input = getInput(PATH, soapRequestString);
	WL.Logger.info(input);
	var userResponse = WL.Server.invokeHttp(input);
	if (userResponse.Envelope.Body.getLdapPersonResponse.getLdapPersonResponse) {
		isExternal = true;
		userFound = true;
	} else {
		isExternal = false;
		// Internal lookup
		soapRequestString = getSoapRequestString(logonId, INTERNAL);
		input = getInput(PATH, soapRequestString);
		WL.Logger.info(input);
		userResponse = WL.Server.invokeHttp(input);	
		if (userResponse.Envelope.Body.getLdapPersonResponse.getLdapPersonResponse) {
			userFound = true;
		}
	}
	
	if (userFound) {
		var userData = {};
		userData = userResponse.Envelope.Body.getLdapPersonResponse.getLdapPersonResponse.results;
		userData.isExternalUser = isExternal;
		return { 
			userData: userData
		}				
	} else {
		return { 
			isSuccessful: false 
		}
	}

}

function getInput(PATH, soapRequestString) {
	var input = {
	    method : 'post',
	    returnedContentType : 'xml',
	    path : PATH,
		body : {
			content : soapRequestString,
			contentType : 'text/xml; charset=UTF-8'
		},
		headers : {
	    	SOAPAction : 'AvAsapIdentityManagementSystem_Public_getLdapPerson_Wsd_Binder_getLdapPerson'
	    }
	};
	return input;
}

/**
 * Construct soap request
 * @param logonId
 * @param location
 * @returns {String} soap request
 */
function getSoapRequestString(logonId, location) {
	
	var soapRequestString = 
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:get="http://carob1/AvAsapIdentityManagementSystem/Public/getLdapPerson_Wsd">'
		+ '<soap:Header/>'
		+ '<soap:Body>'
			+ '<get:getLdapPerson>'
				+ '<getLdapPersonRequest>'
					+ '<id>' + logonId + '</id>'
					+ '<retrieveRoles>true</retrieveRoles>'
					+ '<location>' + location + '</location>'
				+ '</getLdapPersonRequest>'
			+ '</get:getLdapPerson>'
		+ '</soap:Body>'
	+ '</soap:Envelope>';
	return soapRequestString;
	
}

<<<<<<< HEAD
/**
 * Retrieve customer id using lookup service
 * @param logonId
 */
function getUserCustomerId(logonId) {

	const PATH = 'mediator-dev2/ws/getMobResellerIdVS';
	
	// External lookup
	var soapRequestString = getResellerIdSoapRequestString(logonId);
	var input = getResellerIdInput(PATH, soapRequestString);
	var response = {};
	WL.Logger.info(input);
	var userResponse = WL.Server.invokeHttp(input);
	if (typeof userResponse.Envelope.Body.ZcrmGetResellerIdResponse.Bporg.Partner != 'undefined') {
		response.companyId = userResponse.Envelope.Body.ZcrmGetResellerIdResponse.Bporg.Partner;
	}

	return response;

}

/**
 * Construct soap request for getResellerId service
 * @param logonId
 * @param location
 * @returns {String} soap request
 */
function getResellerIdSoapRequestString(logonId) {
	var soapRequestString = 
		'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">'
		+ '<soapenv:Header/>'
		+ '<soapenv:Body>'
		+ '<urn:ZcrmGetResellerId>'
		+ '<Email>' + logonId + '</Email>'
		+ '</urn:ZcrmGetResellerId>'
		+ '</soapenv:Body>'
		+ '</soapenv:Envelope>';	
	return soapRequestString;
}

function getResellerIdInput(PATH, soapRequestString) {
	var input = {
	    method : 'post',
	    returnedContentType : 'xml',
	    path : PATH,
		body : {
			content : soapRequestString,
			contentType : 'text/xml; charset=UTF-8'
		},
		headers : {
	    	SOAPAction : 'urn:sap-com:document:sap:soap:functions:mc-style:ZWS_CRM_GET_RESELLER_ID:ZcrmGetResellerIdRequest'
	    }
	};
	return input;
}


=======
>>>>>>> upstream/master

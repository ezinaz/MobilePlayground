
/**
 * 
 * @param customerId, customerPo, searchType
 * @returns object list of orders
 */
function getOrders(options) {

	var path = 'mediator-dev2/ws/getMobOrderStatusVS';

	
	var customerId = options.customerId | '0009000004';
	var customerPo = options.customerPo |'123';
	var searchType = options.searchType |'PO';
	
	
	var soapRequestString = 
		'<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">'
			+ '<soap:Header/>'
			+ '<soap:Body>'
				+ '<urn:ZqtcSalesorderSearch>'
					+ '<CustomerId>' + customerId + '</CustomerId>'
					+ '<CustomerPo>' + customerPo + '</CustomerPo>'
					+ '<SearchType>' + searchType + '</SearchType>'
				+ '</urn:ZqtcSalesorderSearch>'
			+ '</soap:Body>'
		+ '</soap:Envelope>';
	
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		path : path,
		body : {
			content : soapRequestString,
			contentType : 'application/soap+xml;charset=UTF-8'
		}
	};

	return WL.Server.invokeHttp(input);
}

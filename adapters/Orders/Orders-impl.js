/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *
 *  	// Optional
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "plain", "xml", "html"
 *  	returnedContentEncoding : 'encoding',
 *  	parameters: {name1: value1, ... },
 *  	headers: {name1: value1, ... },
 *  	cookies: {name1: value1, ... },
 *  	body: {
 *  		contentType: 'text/xml; charset=utf-8' or similar value,
 *  		content: stringValue
 *  	},
 *  	transformation: {
 *  		type: 'default', or 'xslFile',
 *  		xslFile: fileName
 *  	}
 *  }
 */


/**
 *
 * @param poNumber
 * @returns xml list of orders
 */
function getOrders() {
	var path = 'mediator-dev2/ws/getOrderStatusVS';
	var action = 'urn:sap-com:document:sap:soap:functions:mc-style:ZWS_QTC_SALESORDER_SEARCH:ZqtcSalesorderSearchRequest'
	
	var soapRequest = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">'
	       +'<soapenv:Header/>'
	       +'<soapenv:Body>'
	       +'<urn:ZqtcSalesorderSearch>'
	         +'<CustomerId>0009000004</CustomerId>'
	         +'<CustomerPo>123</CustomerPo>'
	         +'<SearchType>PO</SearchType>'
	         +'</urn:ZqtcSalesorderSearch>'
	       +'</soapenv:Body>'
	    +'</soap:Envelope>';
	
	    var input = {
	        method : 'post',
	        returnedContentType : 'xml',
	        path : path,
	        body : {
	            content : soapRequest,
	            contentType : 'application/soap+xml;charset=UTF-8'
	        }
	    }

	    return WL.Server.invokeHttp(input);
	}





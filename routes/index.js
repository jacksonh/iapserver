
var appList 	= require ('./appList'), 
	IAPVerifier = require ('iap_verifier');


var getAppDetails = function (req, res) {
	var appid = req.params.appid;
	var version = req.params.version;

	if (!appid) {
		res.send (400, { Error: 'No appid provided.' });
		return null;
	}

	if (!version) {
		res.send (400, { Error: 'No version provided.' })
		return null;
	}

	return {
		appid: 		appid,
		version: 	version
	};
};

/**
 * Return a list of InApp Purchase product IDs
 * available for the supplied application ID and
 * optional application version.
 */

exports.productIds = function (req, res) {
	
	var appDetails = getAppDetails (req, res);
	if (!appDetails) {
		// getAppDetails will send the error code/message
		// if it can't find the stuff that it needs
		return;
	}

	var products = appList.productsFor (appDetails);
	if (!products) {
		res.send (500, { Error: 'No products for appid/version (' + appid + 
			', ' + version + ') found.' });
		return;
	}

	res.send (products);
};


/** 
 * Takes the supplied receipt, posted as raw body data
 * and passes it to apple for verification.
 *
 * Returns:
 *  200 - Receipt is OK, it is assigned to the supplied app and it is not expired
 *  400 - App details (appid/version) were not supplied
 *  403 - The receipt failed validation
 *  404 - The receipt passed validation, but is expired
 *  500 - Validation was not able to process
 */
exports.verifyReceipt = function (req, res) {

	var appDetails = getAppDetails (req, res);
	if (!appDetails) {
		// getAppDetails will send the error code/message
		// if it can't find the stuff that it needs
		return;
	}

	var client = new IAPVerifier (itunes_shared_secret);
		client.verifyReceipt (receipt, function (valid, msg, data) {
		if (valid) {
			// update status of payment in your system
			console.log("Valid receipt");
		} else {
			console.log("Invalid receipt");
		}
	});

};





var apps = {
	manatees: {
		// Versions
		'v1.0': {
			sharedSecret: '',
			products: [{ 
				name: 		'',
				prodcutId:  '',  
				description: '

				'.replace (/\t/g,'')
			}]
		}
	}
};

exports.productsFor = function (args) {
	if (!args.appid || !args.version)
		throw 'Incorrect arguments passed to productsFor';

	var app = apps [args.appid];
	if (!app)
		return null;

	return app [args.version].products;
};



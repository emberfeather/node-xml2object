var fs = require('fs');
var nodeunit = require('nodeunit');
var path = require('path');
var xml2object = require('../lib/xml2object');

exports.testPipe = function(test){
	test.expect(2);

	var stream = fs.createReadStream(path.normalize(__dirname + '/fixture/input_namespace.xml'));
	var parser = new xml2object(['Envelope'], undefined, {xmlns:true});
	var found = [];

	var expectedValue = {
		'xmlns:s': {
			name: 'xmlns:s',
			value: 'http://schemas.xmlsoap.org/soap/envelope/',
			prefix: 'xmlns',
			local: 's',
			uri: 'http://www.w3.org/2000/xmlns/'
		},
		's:encodingStyle': {
			name: 's:encodingStyle',
			value: 'http://schemas.xmlsoap.org/soap/encoding/',
			prefix: 's',
			local: 'encodingStyle',
			uri: 'http://schemas.xmlsoap.org/soap/envelope/'
		},
		Body: {
			actionNameResponse: {
				'xmlns:u': {
					name: 'xmlns:u',
					value: 'urn:schemas-upnp-org:service:serviceType:v',
					prefix: 'xmlns',
					local: 'u',
					uri: 'http://www.w3.org/2000/xmlns/'
				},
				argumentName: 'out arg value'
			}
		}
	};

	parser.on('object', function(name, obj) {
		found.push(obj);
	});

	parser.on('end', function() {
		test.equal(found.length, 1, "Should have found one object");
		test.deepEqual(found[0], expectedValue, 'All values found');
		//dtest.equal(found[1], 'Max', 'Name mismatch');

		test.done();
	});

	stream.pipe(parser.saxStream);
};
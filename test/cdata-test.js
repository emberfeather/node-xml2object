var nodeunit = require('nodeunit');
var path = require('path');
var xml2object = require('../lib/xml2object');

exports.testCData = function(test){
	test.expect(2);

	var parser = new xml2object(['tiger'], path.normalize(__dirname + '/fixture/input03.xml'));
	var found = [];

	parser.on('object', function(name, obj) {
		found.push(obj.$d);
	});

	parser.on('end', function() {
		test.equal(found.length, 1, 'Should have found one objects');
		test.equal(typeof found[0], 'string', 'No cdata found');

		test.done();
	});

	parser.start();
};

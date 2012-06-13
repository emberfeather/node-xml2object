var nodeunit = require('nodeunit');
var path = require('path');
var xml2object = require('../lib/xml2object');

exports.testRoot = function(test){
	test.expect(2);

	var parser = new xml2object(['example'], path.normalize(__dirname + '/fixture/input01.xml'));
	var found = [];

	parser.on('object', function(name, obj) {
		found.push(obj.foo);
	});

	parser.on('end', function() {
		test.equal(found.length, 1, "Should have found two objects");
		test.equal(found[0], 'bar', 'foobar mismatch');

		test.done();
	});

	parser.start();
};

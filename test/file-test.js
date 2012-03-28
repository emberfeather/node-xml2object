var nodeunit = require('nodeunit');
var path = require('path');
var xml2object = require('../lib/xml2object');

exports.testFile = function(test){
	test.expect(3);

	var parser = new xml2object(['dog'], path.normalize(__dirname + '/fixture/input01.xml'));
	var found = [];

	parser.on('object', function(name, obj) {
		found.push(obj.name);
	});

	parser.on('end', function() {
		test.equal(found.length, 2, "Should have found two objects");
		test.equal(found[0], 'Fluffy', 'Name mismatch');
		test.equal(found[1], 'Max', 'Name mismatch');

		test.done();
	});

	parser.start();
};

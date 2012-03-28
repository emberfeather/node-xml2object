var fs = require('fs');
var nodeunit = require('nodeunit');
var path = require('path');
var xml2object = require('../lib/xml2object');

exports.testConstructor = function(test){
	test.expect(3);

	var stream = fs.createReadStream(path.normalize(__dirname + '/fixture/input01.xml'));
	var parser = new xml2object(['dog'], stream);
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

exports.testSetter = function(test){
	test.expect(3);

	var stream = fs.createReadStream(path.normalize(__dirname + '/fixture/input01.xml'));
	var parser = new xml2object(['cat']);
	var found = [];

	parser.source = stream;

	parser.on('object', function(name, obj) {
		found.push(obj.name);
	});

	parser.on('end', function() {
		test.equal(found.length, 2, "Should have found two objects");
		test.equal(found[0], 'Snuggles', 'Name mismatch');
		test.equal(found[1], 'Snowball', 'Name mismatch');

		test.done();
	});

	parser.start();
};

exports.testSetterUnreadable = function(test){
	test.expect(1);

	var stream = fs.createReadStream(path.normalize(__dirname + '/fixture/input01.xml'));
	var parser = new xml2object(['cat']);

	// Make the stream non-readable by destroying
	stream.destroy();

	test.throws(function() {
		parser.source = stream;
	}, Error);

	test.done();
};

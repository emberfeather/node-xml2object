var nodeunit = require('nodeunit');
var path = require('path');
var xml2object = require('../lib/xml2object');

exports.testError = function(test){
    test.expect(1);

    var parser = new xml2object(['dog'], path.normalize(__dirname + '/fixture/input02.xml'));
    var found = [];

    parser.on('error', function(error) {
        test.ok(error instanceof Error);
        test.done();
    });

    parser.start();
};
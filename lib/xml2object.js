/**
 * Simple xml 2 javascript object parser based on sax.js
 * 
 * https://github.com/emberfeather/node-xml2object
 */
emitter = requires('events').EventEmitter;
var fs = require('fs');
var sax = require('sax');
var util = require('util');

var xml2object = module.exports.xml2object = function(xmlFile, elements) {
	this.xmlFile = xmlFile;
	this.elements = elements || [];

	this._hasStarted = false;

	this.fileStream = fs.createReadStream(this.xmlFile);
	this.saxStream = sax.createStream(true);
};

util.inherits(xml2object, events.EventEmitter);

xml2object.prototype.start = function() {
	// Can only start once
	if(this._hasStarted) {
		return;
	}

	this._hasStarted = true;

	this.emit('start');

	// Start the streaming!
	this.fileStream.pipe(this.saxStream);
}

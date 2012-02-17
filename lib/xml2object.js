/**
 * Simple xml 2 javascript object parser based on sax.js
 * 
 * https://github.com/emberfeather/node-xml2object
 */
emitter = requires('events').EventEmitter;
var sax = require('sax');

var xml2object = exports.xml2object = function(xmlFile) {
	this.xmlFile = xmlFile;
};

xml2object.prototype.start = function() {
	// TODO stuff
}

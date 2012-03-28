# Node.js xml2object

Simple wrapper on the [SAX.js](https://github.com/isaacs/sax-js) parser to stream xml into JavaScript objects.

Converts xml elements into JavaScript objects.

## Install

    npm install xml2object

## Usage

### From a file

    var xml2object = require('xml2object');
    
    // Create a new xml parser with an array of xml elements to look for
    var parser = new xml2object('myAnimals.xml', [ 'animal' ]);
    
    // Bind to the object event to work with the objects found in the XML file
    parser.on('object', function(name, obj) {
        console.log('Found an object: %s', name);
        console.log(obj);
    });

    // Bind to the file end event to tell when the file is done being streamed
    parser.on('end', function(name, obj) {
        console.log('Finished parsing xml!');
    });
    
    // Start parsing the XML
    parser.start();

### From a stream

    var xml2object = require('xml2object');
    var request = require('request');
    
    // Create a new xml parser with an array of xml elements to look for
    var parser = new xml2object(null, [ 'animal' ]);
    
    // Bind to the object event to work with the objects found in the XML file
    parser.on('object', function(name, obj) {
        console.log('Found an object: %s', name);
        console.log(obj);
    });

    // Bind to the file end event to tell when the file is done being streamed
    parser.on('end', function(name, obj) {
        console.log('Finished parsing xml!');
    });

    request.get('http://www.example.com/test.xml').pipe(parser.saxStream);

## Module

### xml2object(xmlFile, elements)

Constructor for creating an instance of the xml parser.
The xmlFile argument is optional. If not specified you need to pipe your own Stream into the parser.saxStream.

    var xml2object = require('xml2object');
    
    // Parse the myAnimals.xml file looking for <animal> elements
    var parser = new xml2object('myAnimals.xml', [ 'animal' ]);

### .saxStream

The underlying saxStream. When not using the xmlFile argument in the constructor this stream can be used as
a destination for pipe().

### .start()

Triggers the xml file to start streaming to the parser. Call this method after you have bound to the events.

    // Start parsing the XML
    parser.start();



### Event: 'object'

    function(name, obj) { ... }

Triggered when an object has been parsed from the XML file with the name of the element found and the actual object.

### Event: 'end'

    function() { ... }

Marks the end of the input file when it has been completely streamed through the parser.

## Other Notes

Elements being parsed cannot currently be nested. For example. if you have `root > bikes > bike > wheel` as a heirarchy and have done a `xml2object('transportation.xml', [ 'bike', 'wheel' ])` the bike objects will be returned, but the wheel elements inside the bike element will not be parsed separately.

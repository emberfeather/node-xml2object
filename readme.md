# Node.js xml2object

Simple wrapper on the [SAX.js](https://github.com/isaacs/sax-js) parser to stream xml into JavaScript objects.

Converts xml elements into JavaScript objects.

## Install

    npm install xml2object

## Usage

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

## Module

### xml2object(xmlFile, elements)

Constructor for creating an instance of the xml parser

    var xml2object = require('xml2object');
    
    // Parse the myAnimals.xml file looking for <animal> elements
    var parser = new xml2object('myAnimals.xml', [ 'animal' ]);

### .start()

Triggers the xml file to start streaming to the parser. Call this method after you have bound to the events.

### Event: 'object'

    function(name, obj) { ... }

Triggered when an object has been parsed from the XML file with the name of the element found and the actual object.

### Event: 'end'

    function() { ... }

Marks the end of the input file when it has been completely streamed through the parser.

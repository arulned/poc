/* eslint-disable */

/* Define some initial variables. */
var applicationRoot = __dirname.replace(/\\/g, "/"),
    ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
mockRoot = applicationRoot + '/data',
    mockFilePattern = '.json',
    mockRootPattern = mockRoot + '/**/*' + mockFilePattern,
    apiRoot = '',
    fs = require("fs"),
    glob = require("glob");

    var https = require('https');
    var fs = require('fs');

    var options = {
        key: fs.readFileSync( '/Users/anedumar/localhost.key' ),
        cert: fs.readFileSync( '/Users/anedumar/localhost.cert' ),
        requestCert: false,
        rejectUnauthorized: false
    };
/* Create Express application */
var express = require("express");
var app = express();

/* Configure a simple logger and an error handler. */

//app.use(express.logger());
// app.use(express.errorHandler({
//     dumpExceptions: true,
//     showStack: true
// }));


/* Read the directory tree according to the pattern specified above. */
var files = glob.sync(mockRootPattern);

/* Register mappings for each file found in the directory tree. */
if (files && files.length > 0) {
    files.forEach(function (fileName) {

        var mapping = apiRoot + fileName.replace(mockRoot, '').replace(mockFilePattern, '');

        app.get(mapping, function (req, res) {
            var data = fs.readFileSync(fileName, 'utf8');
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(data);
            res.end();
        });

        console.log('Registered mapping: %s -> %s', mapping, fileName);
    })
} else {
    console.log('No mappings found! Please check the configuration.');
}

/* Start the API mock server. */
console.log('Application root directory: [' + applicationRoot + ']');
console.log('Mock Api Server listening: [http://' + ipaddress + ':' + port + ']');

var server = https.createServer( options, app );

server.listen( port, function () {
    console.log( 'Express server listening on port ' + server.address().port );
} );
//app.listen(port, ipaddress);
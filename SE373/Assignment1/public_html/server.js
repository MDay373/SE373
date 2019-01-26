

var http = require('http');
var url = require('url');
var fileSystem = require('fs');

http.createServer(function (request, response) {
    
    var pathName = url.parse(request.url).pathname;
    var fileName = pathName.substr(1); /* lets remove the "/" from the name */
    var contentType = '';
    var regex = /.json/;
    var containsJson = regex.test(fileName);
    if(containsJson){
        contentType = 'application/json';
    } else{
        contentType = 'text/html';
    }
    
    /* lets try to read the html page found test */
    fileSystem.readFile(fileName , callback);

    function callback(err, data) {
        if (err) {
            console.error(err);
            /* Send the HTTP header 
             * HTTP Status: 301 : Redirect
             * Content Type: text/html 
             */
            response.writeHead(301, {'Location': "http://" + request.headers['host'] + '/index.html' });           
        } else {
            /* Send the HTTP header 
             * HTTP Status: 200 : OK
             * Content Type: text/html 
             */
            response.writeHead(200, {'Content-Type': contentType}); 
            response.write(data.toString());
        }     
        
        /* the response is complete */
        response.end();
    }

   
}).listen(3000);

// Console will print the message
console.log('Server running at http://localhost:3000/index.html');

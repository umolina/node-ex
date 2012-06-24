var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

/**
 * Start handler. Form to POST a file
 * @param response
 */
function start(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" '+
                'content="text/html; charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                '<form action="/upload" enctype="multipart/form-data" '+
                'method="post">'+
                '<input type="file" name="upload" multiple="multiple">'+
                '<input type="submit" value="Upload file" />'+
                '</form>'+
                '</body>'+
                '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

/**
 * Upload handler. handles POST to upload file.
 * @param response
 * @param request
 */
function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    // uses formidable module (npm install formidable)
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {

        /* Possible error on Windows systems:
           tried to rename to an already existing file */
        fs.rename(files.upload.path, "/tmp/test.png", function(err) {
            if (err) {
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });
        
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}


/**
 * Show handler. shows the latest uploaded image
 * @param response
 */
function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
    
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
            
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}


exports.start = start;
exports.upload = upload;
exports.show = show;
// uses formidable module (npm install formidable)

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

/**
 * Form handler. Form to POST a file
 * @param response
 */
function form(response) {
    
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

    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {

        fs.rename(files.upload.path, "/tmp/image.png", function(err) {
            if (err) {
                fs.unlink("/tmp/image.png");
                fs.rename(files.upload.path, "/tmp/image.png");
            }
        });
        
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}


/**
 * show handler. shows the latest uploaded image
 * @param response
 */
function show(response) {

    fs.readFile("/tmp/image.png", "binary", function(error, file) {
    
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


exports.form = form;
exports.upload = upload;
exports.show = show;
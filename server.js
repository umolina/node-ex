var http = require("http");
var url = require("url");


/**
 * server start point
 * @param route
 * @param handle
 */
function start(route, handle) {
    
    /**
     * executes on every server request
     * @param request
     * @param response
     */
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8880);
}


exports.start = start;
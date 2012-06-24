var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


// Inject list of request handlers as an object to router
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;


server.start(router.route, handle);
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./handlers");


// Inject list of request handlers as an object to router
var handle = {};
handle["/"] = requestHandlers.form;
handle["/form"] = requestHandlers.form;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;


server.start(router.route, handle);
const http = require("http");
const url = require("url");
const router = require("./route");

function start() {

    function onRequest(request, response) {
        const pathname = url.parse(request.url).pathname;
        //console.log("Request for " + pathname + " received.");
        //console.log(request.method);

        const result = router.dispatcher(request, response);

        if (result === false) {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write("No handle for method: " + pathname);
            response.end();
        }
    }

    router.register();
    http.createServer(onRequest).listen(8888);
    console.log("Server has started at 8888");
}

start();
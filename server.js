const http = require("http");
const url = require("url");
const router = require("./route");

function onRequest(request, response) {

    const result = router.dispatcher(request, response);

    if (result === false) {
        const pathname = url.parse(request.url).pathname;

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("No handle for method: " + pathname);
        response.end();
    }
}

function start() {

    // 注册所有的handle
    router.register();

    // 创建服务
    http.createServer(onRequest).listen(8888);
    console.log("Server has started at 8888");
}

start();
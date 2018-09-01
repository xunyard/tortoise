const http = require("http");
const router = require("./route");

/**
 * 顶级处理<br>
 * 特殊：dispatcher返回true时，表明处理已完成；否则其自行完成，异步结束
 * @param request
 * @param response
 */
function onRequest(request, response) {
    if (router.dispatcher(request, response) === true)  {
        response.end();
    }
}

function start() {

    // 注册所有的handle
    router.register();

    // 创建服务
    http.createServer(onRequest).listen(9999);
    console.log("Server has started at 9999");
}

start();
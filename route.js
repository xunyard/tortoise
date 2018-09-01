const url = require("url");

const deploy_handler = require("./controller/deploy_handler");

const route_map = new Map();

function handle_default(request, response) {
    const pathname = url.parse(request.url).pathname;

    if (pathname === "/") {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("This a nodejs based server for Gitlab-runner accompany with deployment\n");
        response.write("Author: Xun Ya(xunyard)");
        response.end();
    }
}

/**
 * 注册所有的rest方法
 */
function register() {
    route_map.set("GET:/", handle_default);
    route_map.set("GET://favicon.ico", handle_default);

    deploy_handler.register(route_map);
}

/**
 * 请求分发处理
 */
function dispatcher(request, response) {
    const method = request.method;
    const path = url.parse(request.url).pathname;
    const key = method + ":" + path;
    
    const handler = route_map.get(key);

    // 未找到处理方法，直接返回
    if (!!handler === false) {
        return false;
    } 
    
    // 返回给节点处理结果
    const result = handler(request, response);

    if (result === true) {
        response.end();
    }

    return result;
}

exports.register = register;
exports.dispatcher = dispatcher;

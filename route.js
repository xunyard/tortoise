const url = require("url");

const deploy_handler = require("./controller/deploy_handler");

const route_map = new Map();

/**
 * 注册所有的rest方法
 */
function register() {
    //route_map.set("GET:/", dispatch);
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
    console.log(handler);
    
    // 未找到处理方法，直接返回
    if (handler === null) {
        return false;
    } 
    
    // 返回给节点处理结果
    return handler(request, response);
}

exports.register = register;
exports.dispatcher = dispatcher;

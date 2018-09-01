//const url = require("url");

function kill(request, response) {
    console.log("kill method is called");
    return false;
}


function register(route_map) {
    route_map.set("GET:/api/deploy/kill", kill);
    console.log("successfully register handle: [GET] /api/deploy/kill");
}

exports.register = register;
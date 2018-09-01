
function json_ok(response, message) {
    response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
    const json = {ok: true, message: message};
    response.write(JSON.stringify(json));
    response.end();
    return false;
}

function json_fail(response, message) {
    response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
    const json = {ok: false, message: message};
    response.write(JSON.stringify(json));
    response.end();
    return false;
}

exports.json_ok = json_ok;
exports.json_fail = json_fail;
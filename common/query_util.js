const queryString = require("querystring");
const url = require("url");


function parse_param(request, param) {
    const result = url.parse(request.url);
    const params = queryString.parse(result.query, null, null);

    if (!!param === false) {
        return params;
    } else {
        return params[param];
    }
}



exports.parse_param = parse_param;
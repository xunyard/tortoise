const response_util = require("../common/response_util");
const query_util = require("../common/query_util");


exports.json_ok = response_util.json_ok;
exports.json_fail = response_util.json_fail;
exports.parse_param = query_util.parse_param;
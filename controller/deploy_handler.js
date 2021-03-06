const handle_template = require("./handle_template");
const fs = require("fs");
const process = require('child_process');


/**
 * 杀掉某个进程<br>
 * 用法：/api/deploy/kill?pid=<pid>
 * @param request
 * @param response
 * @returns {boolean}
 */
function handle_kill(request, response) {

    const pid = handle_template.parse_param(request, "pid");
    if (!!pid === false) {
        return handle_template.json_fail(response, "no pid provided in query!");
    }

    kill_pid(response, pid);

    return false;
}

function kill_pid(response, pid) {
    process.exec("kill -9 " + pid, function (error, stdout, stderr) {
        if (error === true) {
            return handle_template.json_fail(response, stderr);
        } else {
            return handle_template.json_ok(response, "confirm kill pid: " + pid);
        }
    });
}

function handle_kill_jar(request, response) {
    const jar = handle_template.parse_param(request, "jar");
    kill_jar(response, jar);
    return false;
}

function kill_jar(response, jar) {
    process.exec("kill -9 `ps x | grep " + jar + " | grep -v grep | awk '{print $1}'`", function (err, stdout, stderr) {
        if (err === true) {
            return handle_template.json_fail(response, stderr);
        } else {
            return handle_template.json_ok(response, "confirm kill jar: " + jar);
        }
    });
}
/**
 * 部署java实例<br>
 * 用法：/api/deploy/run-java?jar=<package>&log=<log>
 * @param request
 * @param response
 * @returns {boolean}
 */
function handle_deploy_java(request, response) {

    const params = handle_template.parse_param(request);

    // 获取jar包
    const jar = params["jar"];
    if (!!jar === false) {
        return handle_template.json_fail(response, "no jar provided in query!");
    }

    // 检测jar包是否存在
    fs.exists(jar, function (exists) {
        if (exists === false) {
            return handle_template.json_fail(response, "jar file not exist in path: " + jar);
        } else {
            return run_java(response, jar, params["log"]);
        }
    });

    return false;
}

/**
 * 运行java代码
 */
function run_java(response, jar, log) {

    let command = !!log === true
        ? "java -jar " + jar + " > " + log + " &"
        : "java -jar " + jar + " &";

    console.log("execute command is: " + command);
    process.exec(command, function (error, stdout, stderr) {
        if (error === true) {
            console.log(stderr);
        }
    });


    return handle_template.json_ok(response, "java run task has been pushed!");
}

function register(route_map) {
    route_map.set("POST:/api/deploy/kill", handle_kill);
    route_map.set("POST:/api/deploy/kill/jar", handle_kill_jar);
    route_map.set("POST:/api/deploy/run-java", handle_deploy_java);
}

exports.register = register;
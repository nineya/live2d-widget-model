const fs = require('fs');
const path = require('path');

/**
 * 读取json文件到对象
 * @param filePath
 */
exports.readJson = function (filePath) {
    let data = fs.readFileSync(filePath);
    return JSON.parse(data)
}

/**
 * 写入对象到json文件
 * @param data
 * @param filePath
 * @param space
 */
exports.writeJson = function (data, filePath, space = 0) {
    let json = JSON.stringify(data, null, space)
    fs.writeFileSync(filePath, json);
}

/**
 * 生成相对目录
 * @param fromPath
 * @param toPath
 * @returns {string}
 */
exports.relativePath = function (fromPath, toPath) {
    return path.relative(fromPath, toPath).replace(/\\/g, "/")
}

/**
 * 创建目录
 * @param dirname
 * @returns {boolean}
 */
exports.mkdirs = function (dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (exports.mkdirs(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

/**
 * 转换model的路径
 * @param modelPath
 * @param indexJson
 */
exports.transformModel = function (modelPath, indexJson) {
    indexJson['model'] = modelPath + '/' + indexJson['model']
}

/**
 * 转换motions中的路径
 * @param modelPath
 * @param indexJson
 */
exports.transformMotions = function (modelPath, indexJson) {
    for (const [key, value] of Object.entries(indexJson['motions'])) {
        for (const data of value) {
            data['file'] = modelPath + '/' + data['file']
        }
    }
}
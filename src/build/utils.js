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
    return path.relative(fromPath, toPath).replace(/\\/g, "/") + "/"
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
 * 转换textures中的路径
 * @param relativePath
 * @param indexJson
 */
exports.transformTextures = function (relativePath, indexJson) {
    let textures = indexJson['textures']
    if (!textures) return
    for (let index in textures) {
        textures[index] = exports.normailzeFilePath(relativePath + textures[index])
    }
}

/**
 * 转换model的路径
 * @param relativePath
 * @param indexJson
 */
exports.transformModel = function (relativePath, indexJson) {
    if (!indexJson['model']) return
    indexJson['model'] = exports.normailzeFilePath(relativePath + indexJson['model'])
}

/**
 * 转换physics的路径
 * @param relativePath
 * @param indexJson
 */
exports.transformPhysics = function (relativePath, indexJson) {
    if (!indexJson['physics']) return
    indexJson['physics'] = exports.normailzeFilePath(relativePath + indexJson['physics'])
}

/**
 * 转换pose的路径
 * @param relativePath
 * @param indexJson
 */
exports.transformPose = function (relativePath, indexJson) {
    if (!indexJson['pose']) return
    indexJson['pose'] = exports.normailzeFilePath(relativePath + indexJson['pose'])
}

/**
 * 转换expressions中的路径
 * @param relativePath
 * @param indexJson
 */
exports.transformExpressions = function (relativePath, indexJson) {
    if (!indexJson['expressions']) return
    for (const data of indexJson['expressions']) {
        data['file'] = exports.normailzeFilePath(relativePath + data['file'])
    }
}

/**
 * 转换motions中的路径
 * @param relativePath
 * @param indexJson
 */
exports.transformMotions = function (relativePath, indexJson) {
    if (!indexJson['motions']) return
    for (const [key, value] of Object.entries(indexJson['motions'])) {
        for (const data of value) {
            data['file'] = exports.normailzeFilePath(relativePath + data['file'])
            data['sound'] && (data['sound'] = exports.normailzeFilePath(relativePath + data['sound']))
        }
    }
}

/**
 * 标准化路径
 * @param filePath
 * @returns {string}
 */
exports.normailzeFilePath = function (filePath) {
    return path.normalize(filePath).replace(/\\/g, "/")
}


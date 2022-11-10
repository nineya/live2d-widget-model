const {readJson, writeJson, relativePath, transformModel, transformPhysics, transformPose, transformTextures, transformMotions, transformExpressions} = require("../utils")
const config = require('../config.json')

exports.build = function (modelId, modelPath, message) {
    let indexJson = readJson(modelPath + config.indexFile)
    let relativeDistPath = relativePath(config.apiHome, modelPath)
    let apiModelPath = config.apiHome + modelId + "-";

    // 处理路径
    transformModel(relativeDistPath, indexJson)
    transformTextures(relativeDistPath, indexJson)
    transformPhysics(relativeDistPath, indexJson)
    transformExpressions(relativeDistPath, indexJson)
    transformMotions(relativeDistPath, indexJson)
    writeJson(indexJson, apiModelPath + "0.json")
    writeJson({id: modelId, name: modelPath, message: message}, apiModelPath + "model.json")
    return 1;
}
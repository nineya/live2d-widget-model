const {readJson, writeJson, relativePath, transformModel, transformTextures, transformMotions} = require("../utils")
const config = require('../config.json')

exports.build = function (modelId, modelPath, message) {
    let textures = readJson(modelPath + config.texturesFile);
    let indexJson = readJson(modelPath + config.indexFile)
    let relativeDistPath = relativePath(config.apiHome, modelPath)
    let apiModelPath = config.apiHome + modelId + "-";
    // 处理路径
    transformModel(relativeDistPath, indexJson)
    transformMotions(relativeDistPath, indexJson)
    // 处理材质
    let textureNum = textures.length
    for (let i = 0; i < textureNum; i++) {
        indexJson['textures'] = textures[i]
        transformTextures(relativeDistPath, indexJson)
        writeJson(indexJson, apiModelPath + i + ".json")
    }
    writeJson({id: modelId, name: modelPath, message: message}, apiModelPath + "model.json")
    return textureNum;
}
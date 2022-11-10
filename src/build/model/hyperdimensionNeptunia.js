const {readJson, writeJson, relativePath, transformModel, transformTextures, transformExpressions, transformPhysics, transformPose, transformMotions} = require("../utils")
const config = require('../config.json')
const fs = require('fs');

const generalName = "general"

exports.build = function (modelId, modelPath, message) {
    let textures = fs.readdirSync(modelPath)
        .filter(name => name !== generalName && fs.statSync(modelPath + name).isDirectory());
    let apiModelPath = config.apiHome + modelId + "-";
    let textureNum = textures.length
    for (let i = 0; i < textureNum; i++) {
        let texture = textures[i] + '/'
        let indexJson = readJson(modelPath + texture + config.indexFile)
        let relativeDistPath = relativePath(config.apiHome, modelPath + texture)
        // 处理路径
        transformModel(relativeDistPath, indexJson)
        transformTextures(relativeDistPath, indexJson)
        transformExpressions(relativeDistPath, indexJson)
        transformPhysics(relativeDistPath, indexJson)
        transformPose(relativeDistPath, indexJson)
        transformMotions(relativeDistPath, indexJson)

        writeJson(indexJson, apiModelPath + i + ".json")
    }
    writeJson({id: modelId, name: modelPath, message: message}, apiModelPath + "model.json")
    return textureNum;
}
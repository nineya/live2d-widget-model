const bilibiliLive = require("./bilibiliLive")
const { writeJson } = require("./utils")
const config = require('./config.json')

const models = [
    // "Potion-Maker/Pio/",
    // "Potion-Maker/Tia/",
    "bilibili-live/22/",
    "bilibili-live/33/",
    // "ShizukuTalk/",
    // "HyperdimensionNeptunia/",
    // "KantaiCollection/murakumo/"
]
const handles = [
    bilibiliLive,
    bilibiliLive,
]
const messages = [
    // "来自 Potion Maker 的 Pio 酱 ~",
    // "来自 Potion Maker 的 Tia 酱 ~",
    "来自 Bilibili Live 的 22 哦 ~",
    "来自 Bilibili Live 的 33 的说",
    // "Shizuku Talk ！这里是 Shizuku ~",
    // "Nep! Nep! 超次元游戏：海王星 系列",
    // "艦隊これくしょん / 叢雲(むらくも)"
]

exports.build = function () {
    let modelsJson = []
    for (let i = 0; i < models.length; i++) {
        let modelPath = models[i]
        console.log("start build " + modelPath)
        let textureNum = handles[i].build(i, config.modelHome + modelPath, messages[i])
        modelsJson[i] = {modelId: i, textureNum: textureNum, modelPath: modelPath}
        console.log("complete " + modelPath)
    }
    writeJson(modelsJson, config.apiHome + "model.json", 4)
}
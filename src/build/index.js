const bilibiliLive = require("./model/bilibiliLive")
const potionMaker = require("./model/potionMaker")
const shizukuTalk = require("./model/shizukuTalk")
const kantaiCollection = require("./model/kantaiCollection")
const hyperdimensionNeptunia = require("./model/hyperdimensionNeptunia")
const {mkdirs, writeJson} = require("./utils")
const fs = require('fs');
const config = require('./config.json')

const models = [
    "Potion-Maker/Pio/",
    "Potion-Maker/Tia/",
    "bilibili-live/22/",
    "bilibili-live/33/",
    "ShizukuTalk/",
    "HyperdimensionNeptunia/",
    "KantaiCollection/murakumo/"
]
const handles = [
    potionMaker,
    potionMaker,
    bilibiliLive,
    bilibiliLive,
    shizukuTalk,
    hyperdimensionNeptunia,
    kantaiCollection
]
const messages = [
    "来自 Potion Maker 的 Pio 酱 ~",
    "来自 Potion Maker 的 Tia 酱 ~",
    "来自 Bilibili Live 的 22 哦 ~",
    "来自 Bilibili Live 的 33 的说",
    "Shizuku Talk ！这里是 Shizuku ~",
    "Nep! Nep! 超次元游戏：海王星 系列",
    "艦隊これくしょん / 叢雲(むらくも)"
]

exports.build = function () {
    mkdirs(config.apiHome)
    let modelListMd = "| modelName | modelId | textureNum |\n"
    modelListMd += "|:---:|:---:|:---:|\n"
    let modelList = []
    for (let i = 0; i < models.length; i++) {
        let modelPath = models[i]
        console.log("start build " + modelPath)
        let textureNum = handles[i].build(i, config.modelHome + modelPath, messages[i])
        modelListMd += `| ${modelPath} | ${i} | ${textureNum} |\n`
        modelList[i] = [i, textureNum]
        console.log("complete " + modelPath)
    }

    let modelReadme = `
## 可用模型列表

${modelListMd}


可选择你想要添加到看板的 \`modelId\` 和 \`textureNum\` 填写到 \`live2d_settings['models']\` 配置。

\`models\` 配置项需要的参数值是一个二维数组，包含模型列表，每项模型中包含模型id和皮肤数量。



**如下示例包含了所有的模型： **
\`\`\`
live2d_settings['models'] = ${JSON.stringify(modelList)}
\`\`\`
`
    fs.writeFileSync(config.modelReadme, modelReadme);
}
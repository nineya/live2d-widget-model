
## 可用模型列表

| modelName | modelId | textureNum |
|:---:|:---:|:---:|
| Potion-Maker/Pio/ | 0 | 87 |
| Potion-Maker/Tia/ | 1 | 63 |
| bilibili-live/22/ | 2 | 156 |
| bilibili-live/33/ | 3 | 156 |
| ShizukuTalk/ | 4 | 2 |
| HyperdimensionNeptunia/ | 5 | 20 |
| KantaiCollection/murakumo/ | 6 | 1 |



可选择你想要添加到看板的 `modelId` 和 `textureNum` 填写到 `live2d_settings['models']` 配置。

`models` 配置项需要的参数值是一个二维数组，包含模型列表，每项模型中包含模型id和皮肤数量。



**如下示例包含了所有的模型： **
```
live2d_settings['models'] = [[0,87],[1,63],[2,156],[3,156],[4,2],[5,20],[6,1]]
```

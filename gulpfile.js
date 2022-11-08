const {src, dest, task, series, parallel} = require("gulp");

// 默认模式
task("default", done => {
    console.log('hello live2d.')
    done()
});
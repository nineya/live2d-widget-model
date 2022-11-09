const {src, dest, task, series, parallel} = require("gulp");
const clean = require("gulp-clean");
const {build} = require("./src/build/index")
const config = require('./src/build/config.json')

task("clean", () => {
    return src([config.apiHome, config.distHome], {
        read: false,
        allowEmpty: true,
    }).pipe(
        clean({
            force: true,
        })
    );
});

task("build", (done) => {
    build()
    done()
})

// 默认模式
task("default", series("clean", "build"));
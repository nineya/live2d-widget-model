const {src, dest, task, series, parallel} = require("gulp");
const clean = require("gulp-clean");
const less = require("gulp-less");
const autoprefix = require("gulp-autoprefixer");
const minifyCSS = require("gulp-csso");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const {build} = require("./src/build/index")
const config = require('./src/build/config.json')

// 清除目录
task("clean", () => {
    return src([config.apiHome, config.distHome, config.modelReadme], {
        read: false,
        allowEmpty: true,
    }).pipe(
        clean({
            force: true,
        })
    );
});

// 创建模型的json文件
task("build", (done) => {
    build()
    done()
})

// 编译压缩css
task("css", () => {
    const ignoreFiles = [].map((file) => `./src/driver/${file}.less`);

    return src("./src/driver/*.less", {
        ignore: ignoreFiles,
    })
        .pipe(less())
        .pipe(
            autoprefix({
                overrideBrowserslist: ["> 2%", "last 2 versions", "not ie 6-9"],
                cascade: false,
            })
        )
        .pipe(minifyCSS())
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(dest(config.distHome));
});

// 压缩js
task("js", () => {
    const ignoreFiles = [].map((file) => `./src/driver/${file}.js`);

    return src("./src/driver/*.js", {
        ignore: ignoreFiles,
    })
        .pipe(uglify())
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(dest(config.distHome));
});

// 拷贝资源
task("assets", () => {
    return src('src/driver/*', {
        ignore: ['**/*.{less,scss}']
    })
        .pipe(dest(config.distHome))
})

// 编译
task("compile", series("clean", parallel("css", "js", "assets")));

// 默认模式
task("default", series("clean", "build", parallel("css", "js", "assets")));
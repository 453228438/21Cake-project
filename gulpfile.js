var gulp = require('gulp');
var uglify = require('gulp-uglify'); //压缩js
var concat = require('gulp-concat'); //合并文件
var rename = require('gulp-rename'); //修改文件名(添加后缀)
var babel = require('gulp-babel'); //es5转es6支持
var connect = require('gulp-connect'); //开启本地服务器
var htmlmin = require("gulp-html-minify"); //压缩html
var minifycss = require("gulp-csso"); //css
var imagemin = require("gulp-imagemin") //img
var collector = require("gulp-rev-collector") //替换版本
    // var minify = require('gulp-minify');
const rev = require('gulp-rev') //添加后缀名
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
// gulp.task('default', ['minijs', 'minicss', 'minihtml', 'watch', 'connect']);
gulp.task('default', function(callback) {
    runSequence('build-clean', ['minijs', 'minicss'],
        'minihtml',
        'watch',
        'connect',
        callback);
});
gulp.task('minijs', function() { //压缩并合并js
        gulp.src('app/app2/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(rev()) //给压缩后的js文件生成hash字符串后缀
            // .pipe(concat('all.js')) //合并js
            .pipe(gulp.dest('dist')) //加入dist文件夹内
            .pipe(rev.manifest()) //生成json文件，进行映射
            .pipe(gulp.dest('rev/js')) //加入rev/js文件夹内
            .pipe(connect.reload())
    })
    // 
    // gulp.task('minihtml', function () { //压缩并合并html
    //     gulp.src('')
    //         .pipe(htmlmin())
    //         .pipe(concat('all.html'))
    //         .pipe(gulp.dest('dist'))
    //         .pipe(connect.reload()); //发生改变刷新
    // })
    // gulp.task('minicss', function () { //压缩并合并css
    //     gulp.src('')
    //         .pipe(minifycss())
    //         .pipe(concat('all.css'))
    //         .pipe(gulp.dest('dist'))
    //         .pipe(connect.reload())
    // })
    // gulp.task('miniimg', function () { //压缩并合并img
    //     gulp.src('')
    //         .pipe(imagemin())
    //         // .pipe(concat('all.image'))
    //         .pipe(gulp.dest('dist'))
    //         .pipe(connect.reload())
    // })
    // gulp.task('watch', function () { //实时监听
    //     gulp.watch('', ['minihtml'])
    //     gulp.watch('', ['minijs'])
    //     gulp.watch('', ['minicss'])
    //     // gulp.watch('', ['miniimg'])
    // })
    // gulp.task('minihtml', function() {

// gulp.task('default', function (callback) {
//     runSequence('build-clean',
//         ['minijs', 'minicss'],
//         'minihtml',
//         'watch',
//         'connect',
//         callback);
// });

gulp.task('minijs', function() { //压缩并合并js
        gulp.src('app/app2/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(rev()) //给压缩后的js文件生成hash字符串后缀
            // .pipe(concat('all.js')) //合并js
            .pipe(gulp.dest('dist')) //加入dist文件夹内
            .pipe(rev.manifest()) //生成json文件，进行映射
            .pipe(gulp.dest('rev/js')) //加入rev/js文件夹内
            .pipe(connect.reload())
    })
    // })
    // gulp.task('minihtml', function () { //压缩并合并html
    //     gulp.src('')
    //         .pipe(htmlmin())
    //         .pipe(concat('all.html'))
    //         .pipe(gulp.dest('dist'))
    //         .pipe(connect.reload()); //发生改变刷新
    // })
    // gulp.task('minicss', function () { //压缩并合并css
    //     gulp.src('')
    //         .pipe(minifycss())
    //         .pipe(concat('all.css'))
    //         .pipe(gulp.dest('dist'))
    //         .pipe(connect.reload())
    // })
    // gulp.task('miniimg', function () { //压缩并合并img
    //     gulp.src('')
    //         .pipe(imagemin())
    //         // .pipe(concat('all.image'))
    //         .pipe(gulp.dest('dist'))
    //         .pipe(connect.reload())
    // })
    // gulp.task('watch', function () { //实时监听
    //     gulp.watch('', ['minihtml'])
    //     gulp.watch('', ['minijs'])
    //     gulp.watch('', ['minicss'])
    //     // gulp.watch('', ['miniimg'])
    // })
gulp.task('minihtml', function() {

    gulp.src(['rev/js/*.json', 'app/app2/a.html'])
        .pipe(collector())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})


gulp.task('all', function() {
    gulp.src('app/**/*.*')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})
gulp.task('connect', function() {
    connect.server({
        root: 'dist',

        port: '8888',

        livereload: true
    });
})
gulp.task('watch', function() {
    gulp.watch('app/**/*.*', ['all'])
})
gulp.task('default', ['all', 'watch', 'connect'])

gulp.task('sass', function() {
    gulp.src('app/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
})
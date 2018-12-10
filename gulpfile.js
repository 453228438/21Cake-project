var gulp = require('gulp');
<<<<<<< HEAD
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const rev = require('gulp-rev');
const collector = require('gulp-rev-collector');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
    console.log(1 + 2);
});
gulp.task('test1', function() {
    console.log('测试1');
})
gulp.task('test2', function() {
    console.log('测试2');
})
gulp.task('test3', function() {
    console.log('测试2');
})
gulp.task('testBoss', ['test1', 'test2', 'test3'], function() {
    console.log('测试完成');
})

gulp.task('mini', function() {
    gulp.src('app/testjs/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
})

gulp.task('rev', function() {

})
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: '3333',
=======
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

// gulp.task('default', ['minijs', 'minicss', 'minihtml', 'watch', 'connect']);
gulp.task('default', function (callback) {
    runSequence('build-clean',
        ['minijs', 'minicss'],
        'minihtml',
        'watch',
        'connect',
        callback);
});
gulp.task('minijs', function () { //压缩并合并js
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
gulp.task('minihtml', function () {
    gulp.src(['rev/js/*.json', 'app/app2/a.html'])
        .pipe(collector())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: '8887',
>>>>>>> fc51c29ce8fdfcba0dcd0f1d329fe0868a62eb54
        livereload: true
    });
})
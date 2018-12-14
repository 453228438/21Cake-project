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

gulp.task('minijs', function() { //压缩并合并js
    gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rev()) //给压缩后的js文件生成hash字符串后缀
        // .pipe(concat('all.js')) //合并js
        .pipe(gulp.dest('dist/js')) //加入dist文件夹内
        .pipe(rev.manifest()) //生成json文件，进行映射
        .pipe(gulp.dest('rev/js')) //加入rev/js文件夹内
        .pipe(connect.reload())
})
gulp.task('miniimg', function() { //压缩并合并img
    gulp.src('app/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload())
})
gulp.task('minifont', function() { //压缩并合并img
    gulp.src('app/font/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/font'))
        .pipe(connect.reload())
})
gulp.task('minifont2', function() { //压缩并合并img
    gulp.src('app/font2/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/font2'))
        .pipe(connect.reload())
})
gulp.task('watch', function() { //实时监听
    gulp.watch('app/js/*.js', ['minijs'])
    gulp.watch('app/*.html', ['minihtml'])
    gulp.watch('app/images/*.*', ['miniimg'])
    gulp.watch('app/font/*.*', ['minifont'])
    gulp.watch('app/font2/*.*', ['minifont2'])
})
gulp.task('minihtml', function() { //压缩并合并html
    gulp.src('app/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload()); //发生改变刷新
})

gulp.task('server1', function () {
    gulp.src('app/server/json/*.json')
        .pipe(gulp.dest('dist/server/json'))
        .pipe(connect.reload())
}),
gulp.task('server2', function () {
    gulp.src('app/server/php/*.php')
        .pipe(gulp.dest('dist/server/php'))
        .pipe(connect.reload())
}),

gulp.task('sass', function() {
    gulp.src('app/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
})

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: '8888',
        livereload: true
    }); 
})
gulp.task('default', function() {
    runSequence(['sass','minijs', 'miniimg', 'minifont', 'minifont2','server1','server2'],
        'minihtml',
        'watch',
        'connect'
    )
});



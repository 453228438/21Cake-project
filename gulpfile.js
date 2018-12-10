var gulp = require('gulp');
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
        livereload: true
    });
})
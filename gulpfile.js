var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var sass = require('gulp-sass');
var concat = require('gulp-concat'); // 合并文件
var minCss = require('gulp-clean-css'); // 压缩css
var autoprefixer = require('gulp-autoprefixer'); // 加前缀
var uglify = require('gulp-uglify'); // 对js的压缩
// 起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            // fallback: 'demo.html', // 指定默认打开文件
            livereload: true, // 自动刷新浏览器
            open: true, // 自动打开浏览器
            host: '169.254.75.104',
            middleware: function(req, res, next) { // 拦截前端请求
                var pathname = url.parse(req.url).pathname;
                if (pathname === 'favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? '/index.html' : pathname;
                console.log(pathname);
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));

            }
        }))
})

// 开发编译scss
gulp.task('scss', function() {
        gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(concat('all.css'))
            .pipe(gulp.dest('src/css'))
    })
    //gulp.watch 监听
gulp.task('watch', function() {
        gulp.watch('./src/scss/*.scss', ['scss'])
    })
    // 开发环境
gulp.task('dev', ['server', 'watch']);

// 线上环境

// 对样式
gulp.task('buildScss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >=4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest('build/css'))
})

// 对js文件的操作
gulp.task('buildJs', function() {
    gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
})

// gulp.task('copyHtml', function() {
//     gulp.src('./src/**/*.html')
//         .pipe(gulp.dest('build'))
// })

//  线上环境

// gulp.task('build', ['buildScss', 'buildJs', 'copyHtml'])
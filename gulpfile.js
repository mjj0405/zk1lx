var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var sass = require('gulp-sass');
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
        .pipe(gulp.dest('src/css'))
})
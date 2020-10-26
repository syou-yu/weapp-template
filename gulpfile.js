const {
  src, dest, series, parallel, watch,
} = require('gulp');

const Path = require('path');
const Less = require('gulp-less'); // less => css
const Rename = require('gulp-rename'); // .css => .wxss
const Alias = require('gulp-wechat-weapp-src-alisa'); // 支持路径使用别名
const Clean = require('gulp-clean'); // 清空文件
const ImageMin = require('gulp-imagemin'); // 图片压缩
const Newer = require('gulp-newer'); // 增量编译
const CleanCSS = require('gulp-clean-css'); // 压缩CSS

// 匹配文件路径
const paths = {
  lessPath: ['src/**/*.less'],
  jsPath: ['src/**/*.js'],
  imagePath: ['src/asset/images/*.{png, jpg, gif, svg, ico}'],
  copy: ['src/**/*.wxml', 'src/**/*.json', 'src/**/*.wxs', 'src/asset*/**/*'],
};

// 路径拼接
function _join(dirname) {
  return Path.join(process.cwd(), 'src', dirname);
}

// 引用路径别名配置
const aliasConfig = {
  '@': _join(''),
};

// 设置 .less 转 .wxss 并拷贝到dist目录
function less2wxss() {
  return src(paths.lessPath, { base: 'src' })
    .pipe(Newer('dist')) // 增量编译
    .pipe(Less())
    .pipe(CleanCSS())
    .pipe(Rename({
      extname: '.wxss',
    }))
    .pipe(dest('dist'));
}

// 拷贝js到dist目录
function js() {
  return src(paths.jsPath, { base: 'src' })
    .pipe(Newer('dist')) // 增量编译
    .pipe(Alias(aliasConfig))
    .pipe(dest('dist'));
}

// 针对 .wxs, .wxml, .json, asset 文件直接复制
function copy() {
  return src(paths.copy)
    .pipe(Newer('dist')) // 增量编译
    // .pipe(Alias(aliasConfig))
    .pipe(dest('dist'));
}

// 对图片进行压缩
function imagemin() {
  return src(paths.imagePath)
    .pipe(Newer('dist')) // 增量编译
    .pipe(ImageMin())
    .pipe(dest('src/asset/images'));
}

// 清空 dist
function clean() {
  return src('dist/*', { read: false })
    .pipe(Clean());
}

// 监听文件变化，增量编译
function auto() {
  watch('src/**/*.*', series(
    less2wxss,
    js,
    copy,
  ));
}

// 执行顺序是从上到下的，清空再全量编译
exports.default = series(
  clean,
  less2wxss,
  js,
  copy,
);

// 先清空再编译，然后监听文件变动做增量编译
exports.watch = series(
  // 先清空再编译
  clean,
  less2wxss,
  js,
  copy,

  // 进行增量编译
  auto,
);

exports.imagemin = series(
  imagemin,
);

const {src, dest, watch, series} = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css( done ){
    src('src/scss/styles.scss')
        .pipe( sass() )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( dest('build/css') )
    done();
}

function watcher(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

function versionWebp( done ){
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp() )
        .pipe( dest('build/img') )
}

function imagenes( done ){
    src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3}))
        .pipe(dest('build/img'));
    done();
}

exports.css = css;
exports.watcher = watcher;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series(imagenes, versionWebp, css, watcher);
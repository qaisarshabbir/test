var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var maps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var path = require('path');
var del = require('del');
var imagemin = require('gulp-imagemin');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var mainBowerFiles = require('main-bower-files');
var ngAnnotate = require('gulp-ng-annotate');
var preprocess = require('gulp-preprocess');
var Server = require('karma').Server;
var stylish = require('gulp-jscs-stylish');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');

/* Default = development mode
/* Run "gulp --build" for continuous integration mode -------------*/
var isBuild = false;

if (gutil.env.build === 'true') {
    isBuild = true;
    sourceMap = true;
}

var vendorScripts = [
    './app/bower_components/angular-animate/angular-animate.js',
    './app/bower_components/angular-ui-router/release/angular-ui-router.js',
    './app/bower_components/angular-sanitize/angular-sanitize.js',
    './app/bower_components/angular-messages/angular-messages.js',
    './app/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
    './app/bower_components/lodash/lodash.js',
    './app/bower_components/angular-stripe/release/angular-stripe.js',
    './app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    './app/bower_components/pubnub/web/pubnub.js',
    './app/bower_components/pubnub-angular/lib/pubnub-angular.js',
    './app/bower_components/ng-file-upload/ng-file-upload.js',
    './app/bower_components/ng-img-crop/compile/unminified/ng-img-crop.js',
    './app/bower_components/angular-scroll-glue/src/scrollglue.js',
    './app/bower_components/ng-csv/build/ng-csv.js'
];

/* Define paths --------------------------------*/
var paths = {
    allScripts:    ['./**/*.js', '!./node_modules{,/**}', '!./build{,/**}', '!./app/bower_components{,/**}'],
    appScripts:    ['./app/scripts/**', '!./app/scripts/**/*.test.js'],
    assets:        ['./app/assets/**', '!./app/assets/images{,/**}'],
    testScripts:   ['./app/scripts/**/*.test.js'],
    images:        ['./app/assets/images/**'],
    htmlTemplates: ['./app/templates/**'],
    indexHtml:     ['./app/index.html'],
    styles:        ['./app/styles/**']
};

/* Gulp Tasks ---------------------------------*/
gulp.task('clean', function(cb) {
    del(['./build'], cb);
});

// Compile Sass and run autoprefixer
gulp.task('compileSass', function() {
    gulp.src(paths.styles, {base: './app/styles'})
    .pipe(isBuild ? gutil.noop() : maps.init())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(isBuild ? gutil.noop() : maps.write('./', {sourceRoot: '/styles'}))
    .pipe(gulp.dest('./build/styles'));
});

// Run tests
gulp.task('test', ['build'], function() {
    var configPath = path.join(__dirname, (isBuild ? '/config/karma-build.conf.js' : '/config/karma-dev.conf.js'));
    new Server({configFile: configPath}).start();
});

// Copy static images and optimize
gulp.task('copyImages', function() {
    gulp.src(paths.images)
    .pipe(isBuild ? imagemin({optimizationLevel: 5}) : gutil.noop())
    .pipe(gulp.dest('./build/assets'));
});

// Copy static assets
gulp.task('copyStaticAssets', function() {
    gulp.src(paths.assets)
    .pipe(gulp.dest('./build/assets'));
});

// Copy Bower Components
gulp.task('copyBowerScripts', function() {
    gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./build/bower_components'));
});

gulp.task('concatVendorScripts', function() {
    gulp.src(vendorScripts)
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./build'));
});

// Fonts
gulp.task('fonts', function() {
    gulp.src('app/bower_components/font-awesome/fonts/fontawesome-webfont.*')
    .pipe(gulp.dest('build/fonts/'));
});

// Lint JS files with JSHint and JSCS
gulp.task('lint', function() {
    gulp.src(paths.allScripts)
    .pipe(jshint())
    .pipe(jscs())
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(isBuild ? jshint.reporter('fail') : gutil.noop())
    .pipe(isBuild ? jscs.reporter('fail') : gutil.noop());
});

// Minify and copy application JavaScript with sourcemaps all the way down
gulp.task('copyAppScripts', function() {
    gulp.src(paths.appScripts, {base: './app/scripts'})
    .pipe(isBuild ? gutil.noop() : maps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(isBuild ? gutil.noop() : maps.write('./', {sourceRoot: '/scripts'}))
    .pipe(gulp.dest('./build'));
});

// Copy HTML pages
gulp.task('copyIndexHtml', function() {
    gulp.src(paths.indexHtml)
    .pipe(isBuild ? gutil.noop() : preprocess({context: {NODE_ENV: 'local'}}))
    .pipe(gulp.dest('./build'));
});
gulp.task('copyHtmlTemplates', function() {
    gulp.src(paths.htmlTemplates)
    .pipe(gulp.dest('./build/templates'));
});

// Rerun the CSS, HTML, and JS tasks when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.styles, ['compileSass']);
    gulp.watch(paths.indexHtml, ['copyIndexHtml']);
    gulp.watch(paths.htmlTemplates, ['copyHtmlTemplates']);
    gulp.watch(paths.allScripts, ['lint']);
    gulp.watch(paths.appScripts, ['copyAppScripts']);
    gulp.watch(paths.images, ['copyImages']);
    gulp.watch(paths.assets, ['copyStaticAssets']);
});

gulp.task('build', [
    'lint',
    'compileSass',
    'copyImages',
    'copyStaticAssets',
    'copyBowerScripts',
    'concatVendorScripts',
    'fonts',
    'copyIndexHtml',
    'copyHtmlTemplates',
    'copyAppScripts'
]);

gulp.task('default', [
    'test',
    'watch'
]);

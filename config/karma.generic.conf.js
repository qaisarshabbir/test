module.exports = {

    basePath: '',

    frameworks: ['jasmine'],

    files: [
        './../build/bower_components/angular.js',
        './../build/bower_components/angular-animate.js',
        './../build/bower_components/angular-ui-router.js',
        './../build/bower_components/angular-sanitize.js',
        './../build/bower_components/angular-messages.js',
        './../build/bower_components/angular-toastr.tpls.js',
        './../build/bower_components/lodash.js',
        'https://js.stripe.com/v2/',
        './../build/bower_components/angular-stripe.js',
        './../build/bower_components/ui-bootstrap-tpls.js',
        './../build/bower_components/pubnub.min.js',
        './../build/bower_components/pubnub-angular.js',
        './../build/bower_components/ng-file-upload.js',
        './../build/bower_components/ng-img-crop.js',
        './../build/bower_components/angular-mocks.js',
        './../build/bower_components/scrollglue.js',
        './../build/bower_components/ng-csv.min.js',
        './../build/app.min.js'
    ],

    exclude: [
    ],

    preprocessors: {
    },

    reporters: ['dots'],

    port: 9876,

    colors: true,

    autoWatch: true,

    browsers: ['PhantomJS'],

    plugins: [
        'karma-junit-reporter',
        'karma-mocha-reporter',
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine',
        'karma-phantomjs-launcher'
    ],

    singleRun: false
};

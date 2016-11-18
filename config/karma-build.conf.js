var _ = require('lodash');
var deepMerge = require('merge-defaults');

module.exports = function(config) {

    // override common defaults
    var buildConfig = {
        logLevel: config.LOG_ERROR,
        singleRun: true
    };

    var mergedConfig = _.merge(buildConfig, require('./karma.generic.conf.js'), deepMerge);
    config.set(mergedConfig);
};

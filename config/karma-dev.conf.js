var _ = require('lodash');
var deepMerge = require('merge-defaults');

module.exports = function(config) {

    // override common defaults
    var devConfig = {
        logLevel: config.LOG_ERROR
    };

    var mergedConfig = _.merge(devConfig, require('./karma.generic.conf.js'), deepMerge);
    config.set(mergedConfig);
};

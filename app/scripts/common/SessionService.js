(function() {
'use strict';
gecko.factory('SessionService', function() {
    var PREFIX = 'zipline-';

    return {
        get: function(key) {
            var result, type;
            var rawResult = localStorage.getItem(PREFIX + key);

            try {
                result = JSON.parse(rawResult);
            } catch (e) {
                result = rawResult;
            }

            return result;
        },

        set: function(key, rawVal) {
            var val;

            if (typeof rawVal === 'object') {
                val = JSON.stringify(rawVal);
            } else {
                val = rawVal;
            }

            localStorage.setItem(PREFIX + key, val);
        },

        unset: function(key) {
            localStorage.removeItem(PREFIX + key);
        }
    };
});
})();

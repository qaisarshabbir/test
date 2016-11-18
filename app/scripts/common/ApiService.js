(function() {
gecko.service('ApiService', function($http) {

    // Set localStorage.setItem('endpoint', 'http://api.dev.zipline.co/') to hit the dev server
    // Reload the page after setting localStorage to enact change
    var baseUrl = localStorage.getItem('endpoint') || 'http://api.dev.zipline.co/';

    var parseQueryParamsObj = function(options) {
        var params = '?';

        for (var opt in options) {
            params += opt + '=' + options[opt] + '&';
        }
        return params;
    };

    return {
        get: function(path, options, version = 2) {
            var request = baseUrl + 'api/v' + version + '/' + path + parseQueryParamsObj(options);
            return $http.get(request);
        },

        post: function(path, payload, headers, version = 2) {
            var url = baseUrl + 'api/v' + version + '/' + path;
            var request = {
                method: 'POST',
                url: url,
                headers: headers,
                data: payload
            };
            return $http(request);
        },

        delete: function(path, version = 2) {
            var request = baseUrl + 'api/v' + version + '/' + path;
            return $http.delete(request);
        },

        getWithCustomToken: function(path, token, version = 2) {
            var url = baseUrl + 'api/v' + version + '/' + path;
            var authHeader = 'Bearer ' + token;
            var request = {
                method: 'GET',
                url: url,
                headers: {
                    Authorization: authHeader
                }
            };
            return $http(request);
        }
    };
});
})();

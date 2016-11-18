(function() {
'use strict';
gecko.service('SearchService', function(ApiService) {

    function search(type, item) {
        var path = type + '/search';
        var queryParams = {
            q: item
        };

        return ApiService.get(path, queryParams)
        .then(function(response) {
            return response.data;
        });
    }

    return {
        search: search
    };

});
})();

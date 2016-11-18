(function() {
'use strict';
gecko.factory('threadsModel', function(ApiService) {

    var currentThread = {
        messages: [],
        id: '',
        recipient: {}
    };

    var threads = [];

    return {
        currentThread: currentThread,
        threads: threads
    };

});
})();


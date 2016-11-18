(function() {
'use strict';
gecko.service('ToastService', function(toastr) {

    function error(message) {
        toastr.error(message, 'Error');
    }

    function success(message) {
        toastr.success(message, 'Success!');
    }

    function info(message) {
        toastr.info(message);
    }

    return {
        error: error,
        success: success,
        info: info
    };

});
})();

(function() {
'use strict';
gecko.service('PartneringService', function(ApiService) {
    function partnerWith(user) {
        return ApiService.get('users/' + user._id + '/affiliation/add');
    }

    function unpartner(user) {
        return ApiService.delete('users/' + user._id + '/affiliation/remove');
    }

    return {
        partnerWith: partnerWith,
        unpartner: unpartner
    };

});
})();

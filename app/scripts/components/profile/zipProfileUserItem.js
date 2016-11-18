(function() {
'use strict';

gecko.directive('zipProfileUserItem', function() {
    return {
        restrict: 'E',
        scope: {
            profile: '=zipProfileUser'
        },
        templateUrl: '/templates/directives/zip-profile-user-item.html'
    };
});
})();

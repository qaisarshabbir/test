(function() {
'use strict';

gecko.directive('zipProfile', function() {
    return {
        restrict: 'E',
        scope: {
            profile: '=zipProfileUser',
            showDetails: '@zipProfileShowDetails'
        },
        templateUrl: '/templates/directives/zip-profile.html',
        controller: function($scope, $rootScope, SessionService) {
            $rootScope.$on('profile:avatar-changed', function(event, args) {
                $scope.profile.avatar = args;
            });

            $rootScope.$on('displayName:changed', function(event, args) {
                if ($scope.profile._id === SessionService.get('profile')._id) {
                    $scope.profile.displayName = args;
                }
            });
        }
    };
});
})();

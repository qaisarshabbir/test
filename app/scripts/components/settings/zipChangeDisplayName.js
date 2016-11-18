(function() {
'use strict';

gecko.directive('zipChangeDisplayName', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/zip-change-display-name.html',
        scope: {},
        controller: function($scope, $log, $rootScope, SessionService, ProfileService) {
            $scope.field = 'notClicked';
            $scope.displayName = {};
            $scope.displayName.new = SessionService.get('profile').displayName;

            $scope.showChangeDisplayName = function() {
                $scope.field = 'clicked';
            };

            $scope.changeDisplayName = function(newDisplayName) {
                return ProfileService.changeDisplayName(newDisplayName)
                .then(function() {
                    $scope.field = 'notClicked';
                    $rootScope.$emit('displayName:changed', newDisplayName);
                }).catch(function(error) {
                    $log.debug(error);
                });
            };
        }
    };
});
})();

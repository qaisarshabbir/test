(function() {
'use strict';

gecko.directive('zipChangePassword', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/zipChangePassword.html',
        scope: {},
        controller: function($scope, $log, ProfileService) {
            $scope.field = 'notClicked';
            $scope.password = {};

            $scope.showChangePassword = function() {
                $scope.field = 'clicked';
            };

            $scope.changePassword = function() {
                return ProfileService.changePassword($scope.password.current, $scope.password.new)
                .then(function() {
                    $scope.password = {};
                    $scope.field = 'notClicked';
                })
                .catch(function(error) {
                    $log.debug(error);
                });
            };
        }
    };
});
})();

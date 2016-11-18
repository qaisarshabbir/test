(function() {
'use strict';

gecko.directive('zipChangeEmail', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/zipChangeEmail.html',
        scope: {},
        controller: function($scope, $rootScope, ProfileService, ToastService) {
            $scope.field = 'notClicked';
            $scope.changeEmail = {};

            $scope.showChangeEmail = function() {
                $scope.field = 'clicked';
            };

            $scope.changeEmail = function() {
                return ProfileService.changeEmail($scope.changeEmail.email, $scope.changeEmail.password)
                .then(function() {
                    $rootScope.$emit('email:changed', $scope.changeEmail.email);
                    $scope.changeEmail = {};
                    $scope.field = 'notClicked';
                }).catch(function(error) {
                    if (error.status === 401) {
                        ToastService.error('Your password is incorrect');
                    } else {
                        ToastService.error('There was an error changing your email');
                    }
                });
            };
        }
    };
});
})();

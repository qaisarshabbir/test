(function() {
'use strict';

gecko.directive('zipLogin', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/zip-login.html',
        controller: function($scope, $rootScope, AuthenticationService, ToastService, ModalService) {
            $scope.loginData = {};

            $scope.login = function() {
                $scope.loginLoading = AuthenticationService.login($scope.loginData)
                .then(function(result) {
                    ModalService.dismissModal();
                    $rootScope.shouldNavbarBeExpanded = false;
                    $rootScope.$emit('authentication:logged in');
                }).catch(function(error) {
                    if (error.error === 'Login failure') {
                        ToastService.error('No account associated with that username or email');
                    } else if (error.error === 'Bad login') {
                        ToastService.error('Incorrect password');
                    } else {
                        ToastService.error('There was an error while logging you in');
                    }
                });
            };
        }
    };
});
})();

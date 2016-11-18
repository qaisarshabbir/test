(function() {
'use strict';

gecko.directive('zipRegister', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/zip-register.html',
        controller: function($scope, $log, $rootScope, AuthenticationService, ToastService, ModalService) {
            $scope.registrationData = {};

            $scope.register = function() {
                $scope.registerLoading = AuthenticationService.register($scope.registrationData)
                .then(function(result) {
                    ModalService.dismissModal();
                    $rootScope.shouldNavbarBeExpanded = false;
                    $rootScope.$emit('authentication:registered');
                }).catch(function(error) {
                    ToastService.error('There was a problem with registration');
                    $log.debug(error);
                });
            };
        }
    };
});
})();

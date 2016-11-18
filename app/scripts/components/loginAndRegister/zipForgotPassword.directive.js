(function() {
'use strict';

gecko.directive('zipForgotPassword', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/zip-forgot-password.html',
        controller: function($scope, $rootScope, ProfileService, ToastService) {
            $scope.sendPasswordResetEmail = function() {
                ProfileService.sendPasswordResetEmail($scope.identifier)
                .then(function() {
                    $rootScope.$emit('login-form: display');
                    ToastService.success('Check your email to reset your password');
                }).catch(function(error) {
                    ToastService.error('We were unable to find that username or email.');
                });
            };
        }
    };
});
})();

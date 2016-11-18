(function() {
'use strict';

gecko.directive('zipFacebookRegister', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/zip-facebook-register.html',
        controller: function($scope, $rootScope, AuthenticationService, ToastService) {
            $scope.addUsername = function() {
                $rootScope.$emit('Facebook:new username', $scope.username);
            };
        }
    };
});
})();

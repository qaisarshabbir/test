(function() {
'use strict';

angular
    .module('gecko.profile')
    .controller('LogoutCtrl', LogoutCtrl);

function LogoutCtrl($scope, $rootScope, AuthenticationService) {

    $scope.logout = function() {
        $rootScope.shouldNavbarBeExpanded = false;
        $rootScope.$emit('authentication:logged out');
        return AuthenticationService.logout();
    };
}
})();

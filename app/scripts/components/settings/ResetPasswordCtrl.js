(function() {
'use strict';

angular
    .module('gecko.profile')
    .controller('ResetPasswordCtrl', ResetPasswordCtrl);

function ResetPasswordCtrl($scope, $log, $stateParams, ProfileService, ToastService) {
    var token = $stateParams.token;
    $scope.resetPassword = function(password) {
        ProfileService.resetPassword($scope.password, token)
        .then(function(response) {
            ToastService.success('You have successfully reset your password');
        }).catch(function(error) {
            ToastService.error('There was an error while resetting your password');
            $log.debug(debug);
        });
    };
}
})();

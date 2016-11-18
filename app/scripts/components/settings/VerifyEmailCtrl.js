(function() {
'use strict';

angular
    .module('gecko.profile')
    .controller('VerifyEmailCtrl', VerifyEmailCtrl);

function VerifyEmailCtrl($scope, $stateParams, ProfileService, ToastService) {
    var token = $stateParams.token;

    $scope.profileLoading = ProfileService.verifyEmail(token)
    .then(function() {
        $scope.confirmed = true;
    }).catch(function(error) {
        if (error.data.error === 'Already verified') {
            $scope.confirmed = true;
            $scope.message = 'You have already verified your account';
        } else {
            $scope.message = 'There was an error verifying your account.';
        }
    });
}
})();

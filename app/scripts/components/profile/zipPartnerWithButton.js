(function() {
'use strict';

gecko.directive('zipPartnerWithButton', function() {
    return {
        restrict: 'E',
        scope: {
            profile: '=zipProfile'
        },
        templateUrl: '/templates/directives/zip-partner-with-button.html',
        controller: function($scope, CurrentUserService, PartneringService) {
            $scope.currentUser = CurrentUserService.currentUserProfile;
            $scope.partneredWith = $scope.profile.allowedAffiliates.indexOf($scope.currentUser._id) > 0 ? true : false;
            $scope.partnerWith = function() {
                PartneringService.partnerWith($scope.profile)
                .then(function(response) {
                    $scope.partneredWith = true;
                });
            };
            $scope.unpartner = function() {
                PartneringService.unpartner($scope.profile)
                .then(function(response) {
                    $scope.partneredWith = false;
                });
            };
        }
    };
});
})();

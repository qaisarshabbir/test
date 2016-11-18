(function() {
'use strict';

angular
    .module('gecko.profile')
    .controller('ViewProfileCtrl', ViewProfileCtrl);

function ViewProfileCtrl($scope, $rootScope, $log, $stateParams, FollowingService,
    UsersService, SessionService, ProfileService) {

    $scope.phase = 'broadcasts';

    UsersService.getProfile($stateParams.profileUsername)
    .then(function(profile) {
        $scope.profile = profile;
        profile.broadcasts.forEach(function(broadcast) {
            broadcast.owner = profile;
        });
        $scope.broadcasts = profile.broadcasts;
        var currentUserProfile = SessionService.get('profile');

        if (currentUserProfile) {
            $scope.isSelf = currentUserProfile.username === profile.username;
            FollowingService.refreshFollowingAndFollowers();
        }

        if ($scope.isSelf) {
            $scope.followers = FollowingService.followers;
            $scope.following = FollowingService.following;
        } else {
            $scope.followers = profile.followers;
            $scope.following = profile.following;
        }

        $rootScope.$on('authentication:logged out', function() {
            $scope.followers = profile.followers;
            $scope.following = profile.following;
        });
    }).catch(function(error) {
        if (error.status === 404) {
            $scope.errorMessage = 'No profile here, sorry!';
        } else {
            $scope.errorMessage = 'There was an error loading this profile';
        }
    });
    $scope.changePhase = function(phase) {
        $scope.phase = phase;
    };

    $scope.isPhaseActive = function(phase) {
        return $scope.phase === phase;
    };

    $rootScope.$on('authentication:logged out', function() {
        $scope.isSelf = false;
    });

    $scope.deleteBroadcast = function(broadcast) {
        return ProfileService.deleteBroadcast(broadcast)
        .then(function(response) {
            _.pullAllBy($scope.broadcasts, [{'_id': broadcast._id}], '_id');
        }).catch(function(error) {
            $log.debug(error);
            ToastService.error('There was an error deleting this broadcast');
        });
    };
}
})();

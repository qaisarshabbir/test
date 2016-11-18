(function() {
'use strict';

gecko.directive('zipFollowButton', function() {
    return {
        restrict: 'E',
        scope: {
            profile: '=zipProfile'
        },
        templateUrl: '/templates/directives/zip-follow-button.html',
        controller: function($scope, $rootScope, SessionService, UsersService, ProfileService, FollowingService) {
            var ownProfile;

            function checkIfFollowing() {
                ownProfile = SessionService.get('profile');

                if (!!ownProfile) {
                    $scope.followButtonVisible = $scope.profile.username !== ownProfile.username;
                    $scope.alreadyFollowing = _.some(FollowingService.following, {'_id': $scope.profile._id});
                }
            }

            checkIfFollowing();

            $scope.follow = function() {
                UsersService.followUser($scope.profile)
                .then(function() {
                    $scope.alreadyFollowing = true;
                    FollowingService.addFollowing($scope.profile);
                });
            };

            $scope.unfollow = function() {
                UsersService.unfollowUser($scope.profile)
                .then(function() {
                    $scope.alreadyFollowing = false;
                    FollowingService.removeFollowing($scope.profile);
                });
            };

            $rootScope.$on('followingList:add', function(event, id) {
                if ($scope.profile._id === id) {
                    $scope.alreadyFollowing = true;
                }
            });

            $rootScope.$on('followingList:remove', function(event, id) {
                if ($scope.profile._id === id) {
                    $scope.alreadyFollowing = false;
                }
            });

            $rootScope.$on('authentication:logged out', function() {
                $scope.followButtonVisible = false;
            });

            $rootScope.$on('followingList:updated', function() {
                checkIfFollowing();
            });
        }
    };
});
})();

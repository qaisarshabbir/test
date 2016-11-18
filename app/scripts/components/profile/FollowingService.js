(function() {
'use strict';
gecko.service('FollowingService', function($rootScope, CurrentUserService) {

    var following = [];
    var followers = [];

    function refreshFollowingAndFollowers() {
        following.length = 0;
        followers.length = 0;

        var profile = CurrentUserService.currentUserProfile;
        profile.following.forEach(function(value) {
            following.push(value);
        });

        profile.followers.forEach(function(value) {
            followers.push(value);
        });
    }

    function removeFollowing(profile) {
        _.remove(following, function(user) {
            return user._id === profile._id;
        });
        $rootScope.$emit('followingList:remove', profile._id);
    }

    function addFollowing(profile) {
        following.push(profile);
        $rootScope.$emit('followingList:add', profile._id);
    }

    $rootScope.$on('authentication:logged out', function() {
        following.length = 0;
        followers.length = 0;
    });

    $rootScope.$on('authentication:logged in', function() {
        refreshFollowingAndFollowers()
        .then(function() {
            $rootScope.$emit('followingList:updated');
        });
    });

    return {
        following: following,
        followers: followers,
        refreshFollowingAndFollowers: refreshFollowingAndFollowers,
        removeFollowing: removeFollowing,
        addFollowing: addFollowing
    };

});
})();

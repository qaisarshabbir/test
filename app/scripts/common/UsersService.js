(function() {
'use strict';
gecko.service('UsersService', function($q, ApiService) {

    function getUsers() {
        return ApiService.get('users').then(function(response) {
            return response.data;
        });
    }

    function getProfile(username) {
        var queryParams = {
            q: username
        };
        return ApiService.get('username', queryParams)
        .then(function(response) {
            return response.data;
        });
    }

    function followUser(user) {
        return ApiService.get('users/' + user._id + '/follow');
    }

    function unfollowUser(user) {
        return ApiService.get('users/' + user._id + '/unfollow');
    }

    return {
        getProfile: getProfile,
        getUsers: getUsers,
        followUser: followUser,
        unfollowUser: unfollowUser
    };

});
})();

(function() {
'use strict';

gecko.filter('removeCurrentUser', function(CurrentUserService) {
    return function(users) {
        return users.filter(function(user) {
            return user._id !== CurrentUserService.currentUserProfile._id;
        });
    };
});
})();

(function() {
'use strict';
gecko.service('ProfileService', function($q, ApiService, SessionService) {

    function changePassword(currentPassword, newPassword) {
        var payload = {
            current: currentPassword,
            new: newPassword
        };
        return ApiService.post('password', payload);
    }

    function changeEmail(newEmail, password) {
        var payload = {
            email: newEmail,
            secret: password
        };
        return ApiService.post('users/profile/email', payload);
    }

    function changeDisplayName(newDisplayName) {
        var payload = {
            displayName: newDisplayName
        };
        return ApiService.post('users/profile/name/display', payload);
    }

    function resetPassword(password, token) {
        var payload = {
            password: password
        };
        var path = 'password/reset/' + token;
        return ApiService.post(path, payload);
    }

    function verifyEmail(token) {
        var path = 'verify/' + token;
        return ApiService.get(path);
    }

    function sendPasswordResetEmail(identifier) {
        var payload = {
            identifier: identifier
        };
        var path = 'password/reset';
        return ApiService.post(path, payload);
    }

    function verifyPassword(password) {
        var payload = {
            password: password
        };
        return ApiService.post('password/verify', payload);
    }

    function deleteBroadcast(broadcast) {
        return ApiService.delete('broadcasts/' + broadcast._id);
    }

    return {
        changePassword: changePassword,
        changeEmail: changeEmail,
        changeDisplayName: changeDisplayName,
        resetPassword: resetPassword,
        verifyEmail: verifyEmail,
        sendPasswordResetEmail: sendPasswordResetEmail,
        verifyPassword: verifyPassword,
        deleteBroadcast: deleteBroadcast
    };

});
})();

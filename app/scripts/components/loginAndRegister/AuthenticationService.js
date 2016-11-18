(function() {
'use strict';
gecko.factory('AuthenticationService', function($http, $log, $q, $rootScope, SessionService, ApiService,
    CurrentUserService, MessagesService) {

    var cacheSession = function(payload) {
        $rootScope.isLoggedIn = true;
        SessionService.set('token', payload.data.accessToken);
        SessionService.set('currentUser', payload.data.userId);
        MessagesService.handleIncomingMessages();
        // Add bearer token to the default header
        $http.defaults.headers.common.Authorization = 'Bearer ' + payload.data.accessToken;
    };

    var uncacheSession = function() {
        $rootScope.isLoggedIn = false;
        SessionService.unset('token');
        SessionService.unset('currentUser');
        CurrentUserService.clearLocalProfile();
        // Remove bearer token from the default header
        $http.defaults.headers.common.Authorization = undefined;
    };

    var requestError = function(error) {
        return $q.reject(error.data);
    };

    return {
        login: function(payload) {
            return ApiService.post('login', payload)
            .then(cacheSession)
            .catch(requestError);
        },
        logout: function() {
            uncacheSession();
            FB.getLoginStatus(function(response) {
                if (response && response.status === 'connected') {
                    FB.logout(function(response) {
                        $log.debug('fb logout response: ', response);
                    });
                }
            });

            return ApiService.post('logout');
        },

        register: function(payload) {
            return ApiService.post('register', payload)
            .then(cacheSession)
            .catch(requestError);
        },

        isLoggedIn: function() {
            return !!SessionService.get('token');
        },

        logInWithBearerToken: function(payload) {
            uncacheSession();
            cacheSession(payload);
            $rootScope.$emit('authentication:logged in');
        }
    };
});
})();

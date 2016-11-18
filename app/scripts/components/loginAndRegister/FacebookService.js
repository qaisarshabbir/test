(function() {
'use strict';
gecko.factory('FacebookService', function($rootScope, $log, AuthenticationService, ToastService, ModalService) {

    var watchLoginChange = function() {

        FB.Event.subscribe('auth.authResponseChange', function(response) {

            if (response.status === 'connected') {
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                var email;

                FB.api('/me?fields=name,picture,email', function(fbResponse) {
                    email = fbResponse.email;

                    var loginPayload = {
                        type: 'facebook',
                        identifier: uid,
                    };

                    AuthenticationService.login(loginPayload)
                    .then(function(response) {
                        ModalService.dismissModal();
                        ToastService.success('You are now logged in');
                        $rootScope.$emit('authentication:logged in');
                    }).catch(function(error) {
                        if (error.message === 'No email, username, or Facebook Id found') {
                            ToastService.info('Please create a Zipline username');
                            $rootScope.$emit('Facebook:not registered');
                            $rootScope.$on('Facebook:new username', function(event, username) {
                                var registerPayload = {
                                    username: username,
                                    email: email,
                                    fbId: uid
                                };
                                AuthenticationService.register(registerPayload)
                                .then(function(response) {
                                    ModalService.dismissModal();
                                    $rootScope.$emit('authentication:logged in');
                                    ToastService.success('You are now logged in');
                                }).catch(function(error) {
                                    ToastService.error('There was an error with registration');
                                });
                            });
                        } else {
                            ToastService.error('There was an error logging in');
                        }
                    });
                });
            } else {
                $log.debug(response);
            }
        });
    };

    return {
        watchLoginChange: watchLoginChange
    };
});
})();

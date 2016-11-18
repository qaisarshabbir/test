(function() {
'use strict';
angular.module('gecko.iosDonations', [
  'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('iosDonations', {
        url: '^/donate/:token',
        resolve: {
            donationInfo: function($stateParams, $q, $log, ApiService, AuthenticationService, ToastService) {
                return ApiService.getWithCustomToken('donate', $stateParams.token)
                .then(function(response) {
                    if (!!response.data.accessToken) {
                        AuthenticationService.logInWithBearerToken(response);
                        return response.data;
                    } else {
                        AuthenticationService.logout()
                        .finally(function() {
                            return response.data;
                        });
                    }
                }).catch(function(error) {
                    $log.debug(error);
                    ToastService.error(error.data.message);
                    return $q.resolve({});
                });
            }
        },
        controller: 'IosDonationsCtrl',
        templateUrl: 'templates/views/ios-donations/ios-donations-form.html'
    });
});
})();

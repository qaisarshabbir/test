(function() {
'use strict';
angular.module('gecko.profile', [
  'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('profile', {
        abstract: true,
        template: '<div ui-view></div>'
    })
    .state('profile.viewSettings', {
        url: '^/settings',
        templateUrl: 'templates/views/profile/settings.html',
        controller: 'SettingsCtrl',
        resolve: {
            profile: function(CurrentUserService) {
                return CurrentUserService.refreshLocalProfile();
            },
            cards: function(CardService) {
                return CardService.getCards();
            },
            transactions: function(CurrentUserService) {
                return CurrentUserService.getTransactions();
            }
        }
    })
    .state('profile.viewProfile', {
        url: '^/:profileUsername',
        templateUrl: 'templates/views/profile/view-profile.html',
        controller: 'ViewProfileCtrl',
        resolve: {
            currentUser: function(CurrentUserService, SessionService) {
                if (!!SessionService.get('token')) {
                    return CurrentUserService.refreshLocalProfile();
                }
            }
        }
    })
    .state('profile.resetPassword', {
        url: '^/password/reset/:token',
        templateUrl: 'templates/views/profile/reset-password.html',
        controller: 'ResetPasswordCtrl'
    })
    .state('profile.verifyEmail', {
        url: '^/account/verify/:token',
        templateUrl: 'templates/views/profile/verify-email.html',
        controller: 'VerifyEmailCtrl'
    });
});
})();

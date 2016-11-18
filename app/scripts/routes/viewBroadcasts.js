(function() {
'use strict';
angular.module('gecko.viewBroadcasts', [
  'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('viewBroadcast', {
        url: '^/:username/:shortId',
        resolve: {
            currentBroadcast: function($stateParams, $state, $location,
                BroadcastService, CommentService, ToastService) {

                return BroadcastService.setCurrentBroadcast($stateParams.username, $stateParams.shortId)
                .then(function(broadcast) {
                    CommentService.subscribeToBroadcast(broadcast);
                }).catch(function() {
                    ToastService.error('Page not found');
                    $location.path('/');
                    $state.go('viewAllBroadcasts', {username: 'broadcasts', shortId: null});
                });
            }
        },
        templateUrl: 'templates/views/viewBroadcasts/broadcasts.html'
    }).state('viewAllBroadcasts', {
        url: '^/',
        resolve: {
            broadcasts: function(BroadcastService) {
                return BroadcastService.getBroadcasts();
            },
            users: function(UsersService) {
                return UsersService.getUsers();
            }
        },
        controller: 'ExploreCtrl',
        templateUrl: 'templates/views/viewBroadcasts/explore.html'
    });
});
})();

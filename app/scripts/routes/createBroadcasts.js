(function() {
'use strict';
angular.module('gecko.createBroadcasts', [
  'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('createBroadcast', {
        url: '^/broadcast',
        templateUrl: 'templates/views/createBroadcasts/create-broadcast.html',
        controller: 'CreateBroadcastCtrl'
    }).state('uploadBroadcast', {
        url: '^/broadcast/upload',
        templateUrl: 'templates/views/createBroadcasts/upload-broadcast.html',
        controller: 'UploadBroadcastCtrl'
    }).state('becomeBroadcaster', {
        url: '^/broadcast/new-broadcaster',
        templateUrl: 'templates/views/createBroadcasts/new-broadcaster.html',
        controller: 'managedAccountFormCtrl'
    }).state('uploadVimeoBroadcast', {
        url: '^/broadcast/upload-vimeo-broadcast',
        params: {
            state: null,
            code: null
        },
        templateUrl: 'templates/views/createBroadcasts/upload-vimeo-broadcast.html',
        controller: 'UploadVimeoCtrl'
    });
});
})();

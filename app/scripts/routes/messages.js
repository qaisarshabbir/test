(function() {
'use strict';
angular.module('gecko.messages', [
  'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('messages', {
        url: '^/messages',
        templateUrl: 'templates/views/messages/messages.html',
        controller: 'MessagesCtrl'
    });
});
})();

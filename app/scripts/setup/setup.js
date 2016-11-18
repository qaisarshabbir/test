(function() {
'use strict';

gecko.run(function($rootScope, $state, $http, $location,
    CurrentUserService, AuthenticationService, SessionService, MessagesService) {

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        $rootScope.shouldNavbarBeExpanded = false;
        $rootScope.isLoggedIn = AuthenticationService.isLoggedIn();

        // Redirect to main page if user is not logged in and tries to access settings
        const internalRoutes = ['/settings', '/messages'];
        const isNotLoggedIn = !AuthenticationService.isLoggedIn();
        const isNotABroadcaster = !CurrentUserService.currentUserProfile.broadcaster;
        const requestInternalRoute = _.includes(internalRoutes, $location.path());
        const requestUpload = $location.path() === '/broadcast/upload';
        const requestManagedAccount = $location.path() === '/broadcast/new-broadcaster';

        if (isNotLoggedIn && requestInternalRoute) {
            e.preventDefault();
            $location.path('/');
            $state.go('viewAllBroadcasts');
        // Don't let a user who is not logged in OR is not a broadcaster upload a broadcast
        // Don't let a user who is not logged in create a managed account
        } else if (
            (requestUpload && (isNotLoggedIn || isNotABroadcaster)) ||
            (requestManagedAccount && isNotLoggedIn)) {

            e.preventDefault();
            $location.path('/broadcast');
            $state.go('createBroadcast');
        }
    });

    // Add a bearer token to the default header if the user is logged in
    if (AuthenticationService.isLoggedIn()) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + SessionService.get('token');
        MessagesService.handleIncomingMessages();
    }
});

// Close modal when a user hits the back button
gecko.run(function($rootScope, $uibModalStack) {
    $rootScope.$on('$locationChangeStart', function(event) {
        var top = $uibModalStack.getTop();
        if (top) {
            $uibModalStack.dismiss(top.key);
            event.preventDefault();
        }
    });
});

gecko.config(function($stateProvider, $urlRouterProvider, $locationProvider, stripeProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
});
})();

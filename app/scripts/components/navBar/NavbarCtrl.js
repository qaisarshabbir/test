(function() {
    'use strict';

    angular
        .module('gecko')
        .controller('NavbarCtrl', NavbarCtrl)
        .value('modalType', {});

    function NavbarCtrl($scope, $state, $rootScope, SessionService, CurrentUserService, modalType) {
        if (!!modalType.type) {
            $scope.display = modalType.type === 'register' ? 'register-form' : 'login-form';
        } else {
            var loggedIn = !!SessionService.get('token');

            if (loggedIn) {
                $scope.display = 'logged-in';
            } else {
                $scope.display = 'login-form';
            }
        }

        $scope.setForm = function(newDisplay) {
            $scope.display = newDisplay;
        };

        $scope.forgotPassword = function() {
            $scope.display = 'forgot-password';
        };

        $rootScope.$on('authentication:logged in', function() {
            $scope.display = 'logged-in';
        });

        $rootScope.$on('authentication:logged out', function() {
            $scope.display = 'login-form';
        });

        $rootScope.$on('authentication:registered', function() {
            $scope.display = 'logged-in';
        });

        $rootScope.$on('Facebook:not registered', function() {
            $scope.display = 'facebook-register-form';
        });

        $rootScope.$on('login-form: display', function() {
            $scope.display = 'login-form';
        });

        $scope.profile = CurrentUserService.currentUserProfile;

        $scope.expandNavbar = function expandNavbar() {
            $rootScope.shouldNavbarBeExpanded = true;
        };

        $scope.closeNavbar = function closeNavbar() {
            $rootScope.shouldNavbarBeExpanded = false;
        };
    }
})();

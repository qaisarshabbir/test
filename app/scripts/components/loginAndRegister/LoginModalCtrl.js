(function() {
    'use strict';

    angular
        .module('gecko.viewBroadcasts')
        .controller('SignInModalCtrl', SignInModalCtrl);

    function SignInModalCtrl($scope, $uibModal) {
        $scope.openSignInModal = function openSignInModal(type) {
            $uibModal.open({
                templateUrl: 'templates/includes/login-modal.html',
                controller: 'NavbarCtrl',
                resolve: {
                    modalType: {
                        type: type
                    }
                },
                windowClass: 'login-modal-container',
            });
        };
    }
})();

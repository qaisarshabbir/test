(function() {
'use strict';

angular
    .module('gecko.profile')
    .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl($scope, $log, $state, $rootScope, CardService, SessionService,
    ToastService, Upload, profile, cards, transactions) {

    $scope.profile = SessionService.get('profile');
    $scope.visible = {
        'private-info': true
    };

    $scope.profile = profile;
    $scope.cards = cards;
    $scope.transactions = transactions;

    var displayCards = function() {
        CardService.getCards()
        .then(function(response) {
            $scope.cards = response;
        }).catch(function(error) {
            $log.debug(error);
        });
    };

    $rootScope.$on('card:modified', function() {
        displayCards();
    });

    $rootScope.$on('authentication:logged out', function() {
        $state.go('viewAllBroadcasts');
    });

    $rootScope.$on('email:changed', function(event, args) {
        $scope.profile.email = args;
    });

    $rootScope.$on('displayName:changed', function(event, args) {
        $scope.profile.displayName = args;
    });

    $scope.upload = function(dataUrl) {
        Upload.upload({
            url: 'http://api.dev.zipline.co/api/v2/user/profile/avatar',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function(response) {
            $scope.result = response.data;
            ToastService.success('Profile image changed');
            $scope.$emit('profile:avatar-changed', response.data.avatar);
        }).catch(function(response) {
            if (response.status > 0) {
                ToastService.error('There was a problem changing your profile picture');
                $scope.errorMsg = response.status + ': ' + response.data.type;
            }
        });
    };

    $scope.isVisible = function isVisible(view) {
        return $scope.visible[view];
    };

    $scope.toggleView = function toggleView(view) {
        $scope.visible[view] = !$scope.visible[view];
    };
}
})();

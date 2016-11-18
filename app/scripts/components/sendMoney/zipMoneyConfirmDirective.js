(function() {
'use strict';

gecko.directive('zipMoneyConfirm', function() {
    return {
        restrict: 'E',
        scope: {
            transaction: '='
        },
        templateUrl: '/templates/directives/zip-money-confirm.html',
        controller: function($scope, $rootScope, BroadcastService, MoneyService, ObjectMappingService, ToastService) {
            $scope.makeTransaction = function() {
                MoneyService.chargeCard($scope.transaction.amount.toString(),
                    $scope.transaction.card._id,
                    $scope.transaction.card.token,
                    $scope.transaction.card.name,
                    $scope.transaction.card.zipCode,
                    $scope.transaction.broadcastId)
                .then(function() {
                    ObjectMappingService.mapObject($scope.transaction, MoneyService.transaction);
                    $scope.transaction.phase = 'sent';
                }).catch(function() {
                    ToastService.error('Sorry, there was an error with the transaction.');
                });
            };
        }
    };
});
})();

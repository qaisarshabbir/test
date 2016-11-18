(function() {
'use strict';

gecko.directive('zipMoney', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/zip-money.html',
        scope: {
            amount: '=amount',
            broadcast: '=broadcast',
            alwaysShow: '=alwaysShow',
            ios: '=ios'
        },
        controller: function($scope, $rootScope, SessionService, MoneyService, BroadcastService, ObjectMappingService) {
            $scope.visible = false;
            $scope.transaction = angular.copy(MoneyService.transaction);
            $scope.transaction.amount = $scope.amount;

            if (!!$scope.broadcast) {
                $scope.transaction.broadcastId = $scope.broadcast._id;
            }

            $scope.closeSendMoney = function() {
                $scope.visible = false;
                $rootScope.$emit('donateForm:display', false);
            };

            $scope.clearTransaction = function() {
                ObjectMappingService.mapObject($scope.transaction, MoneyService.transaction);
            };

            $rootScope.$on('broadcast:changed', function() {
                $scope.transaction = angular.copy(MoneyService.transaction);
                if (!$scope.broadcast) {
                    $scope.transaction.broadcastId = BroadcastService.broadcasts.current._id;
                }
            });

            $rootScope.$on('donateForm:display', function(e, val) {
                $scope.visible = val;
            });

            $rootScope.$on('authentication:logged in', function() {
                MoneyService.getDefaultCard();
            });
        }
    };
});
})();

(function() {
'use strict';

gecko.directive('zipCreditCardTile', function() {
    return {
        restrict: 'E',
        scope: {
            card: '=zipCard'
        },
        templateUrl: '/templates/directives/zipCreditCardTile.html',
        controller: function($scope, $log, CardService) {
            $scope.deleteCard = function(card) {
                CardService.deleteCard(card)
                .then(function() {
                    CardService.updateCardDisplay();
                })
                .catch(function(error) {
                    $log.debug(error);
                });
            };

            $scope.makeDefault = function(card) {
                CardService.makeDefault(card)
                .then(function() {
                    CardService.updateCardDisplay();
                })
                .catch(function(error) {
                    $log.debug(error);
                });
            };
        }
    };
});
})();

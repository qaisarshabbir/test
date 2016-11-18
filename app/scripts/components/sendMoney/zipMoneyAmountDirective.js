(function() {
'use strict';

gecko.directive('zipMoneyAmount', function() {
    return {
        restrict: 'E',
        scope: {
            'transaction': '='
        },
        templateUrl: '/templates/directives/zip-money-amount.html',
        controller: function($scope, $rootScope, CardService, MoneyService) {
            $scope.cardDetails = {};
            $scope.cards = [];

            CardService.getCards()
            .then(function(cards) {
                $scope.cards = cards;
                $scope.transaction.card = _.find($scope.cards, 'default');
            }).finally(function() {
                $scope.cards.push({lastFour: 'Add card'});

                if ($scope.cards.length === 1) {
                    $scope.transaction.card = $scope.cards[0];
                    $scope.addCard = true;
                }
            });

            $scope.$watch('transaction.card.lastFour', function(newValue) {
                if (newValue === 'Add card') {
                    $scope.addCard = true;
                }
            });

            $scope.submitAmount = function() {
                if ($scope.transaction.card.lastFour === 'Add card') {
                    CardService.getStripeToken($scope.cardDetails)
                    .then(function(response) {

                        var card = {
                            token: response.id,
                            lastFour: response.card.last4,
                            name: $scope.cardDetails.name,
                            zipCode: $scope.cardDetails.zip
                        };
                        $scope.transaction.card = card;
                        $scope.cards.push(card);
                        $scope.addCard = false;
                        $scope.transaction.phase = 'confirm';
                    });
                } else {
                    $scope.transaction.phase = 'confirm';
                }
            };
        }
    };
});
})();

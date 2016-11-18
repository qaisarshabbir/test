(function() {
'use strict';

gecko.directive('zipAddCard', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/templates/directives/zip-add-card.html',
        controller: function($scope, $rootScope, $log, AuthenticationService, ListService, CardService, ToastService) {
            $scope.cardDetails = {};

            $scope.addCard = function() {

                return CardService.getStripeToken($scope.cardDetails)
                .then(function(response) {
                    var token = response.id;
                    var cardInfo = {
                        name: $scope.cardDetails.name,
                        zip: $scope.cardDetails.zip,
                        stripeToken: token
                    };

                    CardService.addCard(cardInfo)
                    .then(function() {
                        $scope.cardDetails = {};
                        $rootScope.$broadcast('card:modified');
                    }).catch(function(error) {
                        $log.debug(error);
                    });

                }).catch(function(error) {
                    ToastService.error(error.message);
                    $log.debug(error);
                });
            };
        }
    };
});
})();

(function() {
'use strict';

gecko.directive('zipCreditCardContainer', function() {
    return {
        restrict: 'E',
        scope: {
            allCards: '='
        },
        templateUrl: '/templates/directives/zipCreditCardContainer.html'
    };
});
})();

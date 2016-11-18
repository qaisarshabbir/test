(function() {
'use strict';

gecko.filter('formatMoneySent', function() {
    return function(amount) {
        var trueAmount = Math.floor(amount / 100);
        var stringAmount = trueAmount;

        if (!trueAmount) {
            stringAmount = '0';
        } else if (trueAmount >= 10000 && trueAmount < 1000000) {
            stringAmount = Math.floor(trueAmount / 1000) + 'K';
        } else if (trueAmount >= 1000000) {
            var numberOfMillions = trueAmount / 1000000;
            stringAmount = numberOfMillions.toFixed(2) + 'M';
        }

        return '$' + stringAmount;
    };
});
})();

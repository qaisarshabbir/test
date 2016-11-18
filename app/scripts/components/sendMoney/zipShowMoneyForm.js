(function() {
'use strict';

gecko.directive('zipShowMoneyForm', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope) {
            scope.showMoneyForm = function() {
                $rootScope.$emit('donateForm:display', true);
            };
        }
    };
});
})();

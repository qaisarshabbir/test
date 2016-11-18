(function() {
'use strict';
gecko.directive('zipCardFormFields', function(ListService) {
    return {
        require: '^form',
        restrict: 'E',
        scope: {
            model: '='
        },
        templateUrl: '/templates/includes/add-card-form-fields.html',
        link: function(scope, b, c, ctrl) {
            var lists = angular.copy(ListService);

            scope.years = lists.cardYears;
            scope.months = lists.cardMonths;

            scope.form = ctrl;
        }
    };
});
})();

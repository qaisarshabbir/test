(function() {
'use strict';
gecko.directive('zipUsernameField', function() {
    return {
        require: '^form',
        restrict: 'E',
        scope: {
            model: '=',
            type: '='
        },
        templateUrl: '/templates/directives/zip-username-field.html',
        link: function(scope, b, c, ctrl) {
            scope.formElem = ctrl.username;
            if (scope.type === 'register') {
                scope.register = true;
            }
        }
    };
});
})();

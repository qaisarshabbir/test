(function() {
'use strict';
gecko.directive('zipPasswordField', function() {
    return {
        require: '^form',
        restrict: 'E',
        scope: {
            model: '='
        },
        templateUrl: '/templates/directives/zip-password-field.html',
        link: function(scope, b, c, ctrl) {
            scope.formElem = ctrl.password;
            scope.inputType = 'password';
            scope.toggleShowPassword = function() {
                if (scope.inputType === 'password') {
                    scope.inputType = 'text';
                } else {
                    scope.inputType = 'password';
                }
            };
        }
    };
});
})();

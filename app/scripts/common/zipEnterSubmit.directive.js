gecko.directive('zipEnterSubmit', function() {
    return function(scope, element, attrs) {
        element.bind('keydown', function(event) {
            if (event.which === 13 && !event.shiftKey) { // 13 = enter key
                event.preventDefault();
                scope.$apply(function() {
                    scope.$eval(attrs.zipEnterSubmit);
                });
            }
        });
    };
});

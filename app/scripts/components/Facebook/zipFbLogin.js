(function() {
'use strict';

gecko.directive('zipFbLogin', function($rootScope) {
    return function(scope, iElement, iAttrs) {
        if (FB) {
            FB.XFBML.parse();
        }
    };
});

})();

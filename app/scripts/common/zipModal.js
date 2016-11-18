(function() {
'use strict';
gecko.directive('zipModal', function(ModalService) {
    return {
        restrict: 'A',
        link: function(scope) {
            scope.closeModal = function() {
                ModalService.dismissModal();
            };
        }
    };
});
})();

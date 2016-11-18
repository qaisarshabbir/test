(function() {
'use strict';
gecko.factory('ModalService', function($uibModalStack) {

    function dismissModal() {
        var top = $uibModalStack.getTop();
        if (top) {
            $uibModalStack.dismiss(top.key);
        }
    }

    return {
        dismissModal: dismissModal
    };

});
})();

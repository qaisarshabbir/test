(function() {
'use strict';

angular
    .module('gecko.createBroadcasts')
    .controller('UploadVimeoCtrl', UploadVimeoCtrl);

function UploadVimeoCtrl($scope, $state) {
    $scope.redirect = function(location, params) {
        $state.go(location, params);
    };
}
})();

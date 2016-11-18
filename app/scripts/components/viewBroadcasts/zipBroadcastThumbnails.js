(function() {
'use strict';

gecko.directive('zipBroadcastThumbnails', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/zip-broadcast-thumbnails.html',
        scope: {
            broadcasts: '=',
            hideProfile: '=',
            deleteBroadcast: '='
        },
        link: function(scope) {
            scope.showConfirmation = [];

            scope.showDeleteConfirmation = function(broadcast) {
                scope.showConfirmation.push(broadcast._id);
            };

            scope.closeAlert = function(broadcast) {
                var broadcastIndex = scope.showConfirmation.indexOf(broadcast._id);
                scope.showConfirmation.splice(broadcastIndex, 1);
            };
        }
    };
});
})();

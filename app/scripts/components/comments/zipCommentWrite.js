(function() {
'use strict';

gecko.directive('zipCommentWrite', function() {
    return {
        restrict: 'E',
        scope: {
            newComment: '=',
            addedComments: '='
        },
        templateUrl: '/templates/directives/zip-comment-write.html',
        controller: function($scope, $rootScope, $log, CommentService, SessionService, ToastService) {

            $scope.submitComment = function() {

                var broadcastId = CommentService.currentBroadcast.id;
                var commentData = CommentService.buildCommentRequest($scope.newComment);

                var uid = Math.random();
                CommentService.addCommentToLocalList($scope.newComment, null, uid);
                $scope.newComment = '';

                return CommentService.submitComment(commentData).catch(function(error) {
                    CommentService.markCommentWithError(uid);
                    $log.debug(error);
                });
            };
        }
    };
});
})();

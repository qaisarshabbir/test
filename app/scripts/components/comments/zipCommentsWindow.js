(function() {
'use strict';

gecko.directive('zipCommentsWindow', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/templates/directives/zip-comments-window.html',
        controller: function($scope, $rootScope, CommentService) {
            CommentService.getComments();
            $scope.comments = CommentService.currentBroadcast.comments;

            $scope.retryComment = function(comment) {
                comment.error = false;
                CommentService.submitComment(CommentService.buildCommentRequest(comment.text))
                .catch(function(error) {
                    comment.error = true;
                });
            };
        }
    };
});
})();

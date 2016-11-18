(function() {
'use strict';
gecko.service('CommentService', function(
    $rootScope,
    $log,
    ApiService,
    SessionService,
    BroadcastService,
    ToastService,
    PubNub,
    PublishingService) {

    var currentBroadcast = {
        id: '',
        comments: []
    };

    function buildCommentRequest(text) {
        return {
            text: text
        };
    }

    function addCommentToLocalList(text, money, trackingId) {
        var username = SessionService.get('profile').username;
        var avatar = SessionService.get('profile').avatar;

        var newComment = {
            text: text,
            uid: trackingId,
            author: {
                username: username,
                avatar: avatar
            },
            money: money
        };

        currentBroadcast.comments.push(newComment);
    }

    function submitComment(comment) {
        var path = 'broadcast/' + currentBroadcast.id + '/comment';
        return ApiService.post(path, comment);
    }

    function markCommentWithError(uid) {
        _.findLast(currentBroadcast.comments, {uid: uid}).error = true;
    }

    function removeCommentThatHasError(text) {
        var username = SessionService.get('profile').username;
        _.remove(currentBroadcast.comments, function(comment) {
            return comment.text === text && comment.author.username === username && comment.error === true;
        });
    }

    function getComments() {
        var broadcastModel = BroadcastService.broadcasts.current;

        currentBroadcast.comments.length = 0;

        if (!broadcastModel._id) {
            currentBroadcast.id = '';
        } else {
            currentBroadcast.id = broadcastModel._id;
            ApiService.get('broadcast/' + currentBroadcast.id + '/comment')
            .then(function(response) {
                response.data.forEach(function(comment) {
                    currentBroadcast.comments.push(comment);
                });
            }).catch(function(error) {
                ToastService.error('There was an error retrieving comments');
                $log.debug(error);
            });
        }
    }

    function subscribeToBroadcast(broadcast) {
        PublishingService.unsubscribeFromAllChannels();

        if (!!broadcast._id) {
            getComments();
            PublishingService.handleIncomingComments(broadcast, addExternalCommentToLocalList);
        }
    }

    function addExternalCommentToLocalList(comment) {
        var text, money;

        if (comment.money) {
            money = true;
        } else {
            text = comment.text;
        }

        var newComment = {
            text: text,
            author: comment.author,
            money: money
        };

        $rootScope.$apply(function() {
            currentBroadcast.comments.push(newComment);
        });
    }

    return {
        currentBroadcast,
        buildCommentRequest,
        addCommentToLocalList,
        submitComment,
        markCommentWithError,
        removeCommentThatHasError,
        getComments,
        subscribeToBroadcast
    };

});
})();

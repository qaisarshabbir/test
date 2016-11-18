(function() {
'use strict';
gecko.service('PublishingService', function($rootScope, PubNub, CurrentUserService, BroadcastService) {

    function unsubscribeFromAllChannels() {
        var userId = CurrentUserService.currentUserProfile._id;
        var currentPubNubChannels = PubNub.ngListChannels();
        _(currentPubNubChannels).forEach(function(value) {
            if (value !== userId) {
                PubNub.ngUnsubscribe({channel: value});
            }
        });
    }

    function handleIncomingComments(broadcast, callback) {
        PubNub.ngSubscribe({channel: broadcast._id});
        var currentUsername = CurrentUserService.currentUserProfile.username;
        $rootScope.$on(PubNub.ngMsgEv(broadcast._id), function(event, payload) {
            if (payload.message.money || payload.message.author.username !== currentUsername) {
                callback(payload.message);
            }

            if (payload.message.money) {
                BroadcastService.updateAmountRaised(payload.message.transaction.amount);
            }
        });
    }

    function handleIncomingPrivateMessages(callback) {
        var userId = CurrentUserService.currentUserProfile._id;
        PubNub.ngSubscribe({channel: userId});

        $rootScope.$on(PubNub.ngMsgEv(userId), function(event, payload) {
            callback(payload.message.message, payload.message.thread);
        });
    }

    return {
        unsubscribeFromAllChannels: unsubscribeFromAllChannels,
        handleIncomingComments: handleIncomingComments,
        handleIncomingPrivateMessages: handleIncomingPrivateMessages
    };

});
})();

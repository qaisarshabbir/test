(function() {
'use strict';
gecko.service('MessagesService', function($rootScope, ApiService, SessionService,
    ObjectMappingService, PublishingService, threadsModel) {

    function handleIncomingMessages() {
        PublishingService.handleIncomingPrivateMessages(function(message, thread) {
            //new thread
            if (!!thread) {
                var recipient = getRecipientFromThread(thread);
                thread.displayName = recipient.displayName;
                thread.recipientId = recipient._id;
                thread.messages = [message];
                $rootScope.$apply(function() {
                    threadsModel.threads.push(thread);
                });
            //new message for existing thread
            } else {
                $rootScope.$apply(function() {
                    _.find(threadsModel.threads, {'_id': message.thread._id}).messages.unshift(message);
                    _.find(threadsModel.threads, {'_id': message.thread._id}).lastUpdated = message.lastUpdated;
                });

                if (threadsModel.currentThread.id === message.thread._id) {
                    threadsModel.currentThread.messages.push(message);
                    $rootScope.$emit('currentConversation:changed');
                }
            }
        });
    }

    function refreshLocalThreadList() {
        return ApiService.get('threads')
        .then(function(response) {
            threadsModel.threads.length = 0;
            _.each(response.data, function(thread) {
                var recipient = getRecipientFromThread(thread);
                thread.displayName = recipient.displayName;
                thread.recipientId = recipient._id;
                threadsModel.threads.push(thread);
            });
        }).then(function() {
            _.each(threadsModel.threads, function(thread) {
                return ApiService.get('threads/' + thread._id)
                .then(function(response) {
                    thread.messages = response.data;
                });
            });
        });
    }

    function setCurrentThread(thread) {
        threadsModel.currentThread.id = thread._id;
        threadsModel.currentThread.recipient = getRecipientFromThread(thread);
        threadsModel.currentThread.messages.length = 0;
        _.each(thread.messages, function(message) {
            threadsModel.currentThread.messages.push(message);
        });
    }

    function sendMessage(newMessage) {
        var path, payload;

        if (!!threadsModel.currentThread.id) {
            payload = {
                text: newMessage
            };
            path = '/thread/' + threadsModel.currentThread.id + '/message';

            return ApiService.post(path, payload)
            .then(function(response) {
                threadsModel.currentThread.messages.push(response.data);
                _.find(threadsModel.threads, {'_id': threadsModel.currentThread.id}).messages.unshift(response.data);
                _.find(threadsModel.threads, {'_id': threadsModel.currentThread.id}).lastUpdated =
                    response.data.lastUpdated;
            });
        } else {
            payload = {
                text: newMessage
            };
            path = 'users/' + threadsModel.currentThread.recipient._id + '/message';

            return ApiService.post(path, payload)
            .then(function(response) {
                var thread = response.data;
                threadsModel.currentThread.id = thread._id;

                var recipient = getRecipientFromThread(thread);
                thread.displayName = recipient.displayName;
                thread.recipientId = recipient._id;

                var message = {
                    text: newMessage
                };
                message.author = SessionService.get('profile');
                message.created = response.data.created;

                thread.messages = [message];

                threadsModel.currentThread.messages.push(message);
                threadsModel.threads.push(thread);
            });
        }
    }

    function openThread(user) {
        var thread = _.find(threadsModel.threads, _.matchesProperty('recipientId', user._id));
        if (!!thread) {
            setCurrentThread(thread);
        } else {
            threadsModel.currentThread.messages.length = 0;
            threadsModel.currentThread.id = '';
            ObjectMappingService.mapObject(threadsModel.currentThread.recipient, user);
        }
    }

    function getRecipientFromThread(thread) {
        var currentUserId = SessionService.get('profile')._id;
        var recipientArray = _.filter(thread.participants, function(p) {
            return p._id !== currentUserId;
        });
        return recipientArray[0];
    }

    return {
        handleIncomingMessages: handleIncomingMessages,
        refreshLocalThreadList: refreshLocalThreadList,
        setCurrentThread: setCurrentThread,
        openThread: openThread,
        sendMessage: sendMessage
    };

});
})();


(function() {
'use strict';
gecko.service('BroadcastService', function($rootScope, $q, ApiService, UsersService, ObjectMappingService) {
    var broadcasts = {
        all: [],
        current: {},
        currentBroadcasterProfile: {}
    };

    function clearCurrentBroadcast() {
        ObjectMappingService.mapObject(broadcasts.current, {});
        ObjectMappingService.mapObject(broadcasts.currentBroadcasterProfile, {});
    }

    function getBroadcasts() {
        return ApiService.get('broadcast')
        .then(function(response) {
            broadcasts.all = response.data;
            return broadcasts.all;
        });
    }

    function setCurrentBroadcast(username, shortId) {
        return UsersService.getProfile(username)
        .then(function(profile) {
            ObjectMappingService.mapObject(broadcasts.currentBroadcasterProfile, profile);
            var currentBroadcast = profile.broadcasts.filter(function(broadcast) {
                return broadcast.shortId === shortId;
            });

            if (currentBroadcast.length > 0) {
                ObjectMappingService.mapObject(broadcasts.current, currentBroadcast[0]);
                return $q.resolve(broadcasts.current);
            } else {
                clearCurrentBroadcast();
                return $q.reject('No broadcast with that ID');
            }
        }).catch(function(error) {
            clearCurrentBroadcast();
            return $q.reject(error);
        });
    }

    function getAffiliateInfo(broadcastId) {
        var path = 'broadcast/' + broadcastId;
        return ApiService.get(path)
        .then(function(response) {
            return response.data.affiliate;
        });
    }

    function updateBroadcastInformation(broadcast, title, affiliateId) {
        var path = 'broadcasts/' + broadcast._id + '/update';
        var payload = {
            name: title,
            affiliate: affiliateId
        };

        return ApiService.post(path, payload);
    }

    function updateAmountRaised(amount) {
        $rootScope.$apply(function() {
            if (!!broadcasts.current.amountRaised) {
                broadcasts.current.amountRaised += parseInt(amount);
            } else {
                broadcasts.current.amountRaised = parseInt(amount);
            }
        });
    }

    return {
        broadcasts: broadcasts,
        clearCurrentBroadcast: clearCurrentBroadcast,
        getBroadcasts: getBroadcasts,
        setCurrentBroadcast: setCurrentBroadcast,
        getAffiliateInfo: getAffiliateInfo,
        updateBroadcastInformation: updateBroadcastInformation,
        updateAmountRaised: updateAmountRaised
    };

});
})();

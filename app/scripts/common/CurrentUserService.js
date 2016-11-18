(function() {
'use strict';
gecko.service('CurrentUserService', function($rootScope, ApiService, ObjectMappingService, SessionService) {

    var currentUserProfile = {};

    ObjectMappingService.mapObject(currentUserProfile, SessionService.get('profile'));

    $rootScope.$on('authentication:logged out', function() {
        ObjectMappingService.mapObject(currentUserProfile, {});
    });

    $rootScope.$on('authentication:registered', function() {
        refreshLocalProfile()
        .then(function(profile) {
            ObjectMappingService.mapObject(currentUserProfile, profile);
        });
    });

    $rootScope.$on('authentication:logged in', function() {
        refreshLocalProfile()
        .then(function(profile) {
            ObjectMappingService.mapObject(currentUserProfile, profile);
        });
    });

    function refreshLocalProfile() {
        return ApiService.get('users/me')
        .then(function(response) {
            var profile = response.data;
            SessionService.set('profile', profile);
            ObjectMappingService.mapObject(currentUserProfile, profile);
            return profile;
        });
    }

    function clearLocalProfile() {
        SessionService.unset('profile');
    }

    function getTransactions() {
        return ApiService.get('transactions')
        .then(function(response) {
            var transactionsForCSV = response.data.map(function(transaction) {
                var name = transaction.name;
                var amount = (transaction.amount / 100).toFixed(2);
                var date = transaction.created.slice(0,10);
                var zip = transaction.address ? transaction.address.zip : undefined;

                return {name, date, amount, zip};
            });
            return transactionsForCSV;
        });
    }

    return {
        currentUserProfile,
        refreshLocalProfile,
        clearLocalProfile,
        getTransactions
    };

});
})();

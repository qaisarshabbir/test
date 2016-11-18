(function() {
'use strict';

gecko.directive('zipBroadcastVideo', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/directives/zipBroadcastVideo.html',
        controller: function($scope, $rootScope, BroadcastService) {
            function updateBroadcastInfo() {
                $scope.broadcast = BroadcastService.broadcasts.current;
                if ($scope.broadcast.affiliate) {
                    BroadcastService.getAffiliateInfo($scope.broadcast._id)
                    .then(function(affiliate) {
                        $scope.affiliate = affiliate;
                    });
                }
                $scope.broadcaster = BroadcastService.broadcasts.currentBroadcasterProfile;
            }

            updateBroadcastInfo();

            var listener = $rootScope.$on('broadcast:changed', function() {
                updateBroadcastInfo();
            });

            $scope.$on('$destroy', function() {
                listener();
            });
        }
    };
});
})();

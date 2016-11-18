(function() {
'use strict';

angular
    .module('gecko.viewBroadcasts')
    .controller('ExploreCtrl', ExploreCtrl);

function ExploreCtrl($scope, broadcasts, users, SearchService) {
    var currentState = 'broadcasts';

    $scope.broadcasts = broadcasts;
    $scope.users = users;
    $scope.isState = function isState(state) {
        return state === currentState;
    };

    $scope.changeState = function changeState(state) {
        currentState = state;
        reset();
    };

    $scope.search = function search() {
        if (!$scope.searchItem) {
            reset();
        } else {
            SearchService.search(currentState, $scope.searchItem)
            .then(function(searchResults) {
                if (currentState === 'broadcasts') {
                    $scope.broadcasts = searchResults;
                } else {
                    $scope.users = searchResults;
                }
            });
        }
    };

    function reset() {
        $scope.broadcasts = broadcasts;
        $scope.users = users;
        $scope.searchItem = '';
    }
}
})();

(function() {
'use strict';

angular
    .module('gecko.messages')
    .controller('MessagesCtrl', MessagesCtrl);

function MessagesCtrl($scope, $rootScope, $state, $filter, $window, UsersService, SearchService, MessagesService,
    threadsModel, ToastService, ObjectMappingService, CurrentUserService) {

    $scope.visible = {
        threads: true
    };
    $scope.visible.currentThread = $window.innerWidth > 900;

    $scope.currentConversation = threadsModel.currentThread;
    $scope.threads = threadsModel.threads;

    MessagesService.refreshLocalThreadList()
    .catch(function(error) {
        ToastService.error('There was an error retrieving your messages');
    });

    $scope.toggleView = function toggleView() {
        $scope.visible.threads = !$scope.visible.threads;
        $scope.visible.currentThread = !$scope.visible.currentThread;
    };

    $scope.searchUsers = function(searchText) {
        if (searchText) {
            SearchService.search('users', searchText)
            .then(function(response) {
                $scope.users = $filter('removeCurrentUser')(response);
            });
        } else {
            $scope.users = $scope.fullListOfUsers;
        }
    };

    $scope.toggleListOfUsers = function showList() {
        if ($scope.userListShown) {
            $scope.userListShown = false;
        } else {
            UsersService.getUsers()
            .then(function(data) {
                $scope.users = $filter('removeCurrentUser')(data);
                $scope.fullListOfUsers = data;
                $scope.userListShown = true;
            });
        }
    };

    $scope.showConversation = function showConversation(thread) {
        if (!$scope.visible.threads || !$scope.visible.currentThread) {
            $scope.toggleView();
        }
        MessagesService.setCurrentThread(thread);
        $scope.userListShown = false;
    };

    $scope.sendMessage = function sendMessage(newMessage) {
        return MessagesService.sendMessage(newMessage)
        .then(function() {
            $scope.newMessage = '';
        });
    };

    $scope.openConversation = function openConversation(user) {
        if (!$scope.visible.threads || !$scope.visible.currentThread) {
            $scope.toggleView();
        }
        $scope.userListShown = false;
        MessagesService.openThread(user);
    };

    $rootScope.$on('currentConversation:changed', function() {
        $scope.$apply(function() {
            ObjectMappingService.mapObject($scope.currentConversation, threadsModel.currentThread);
        });
    });

    $rootScope.$on('authentication:logged out', function() {
        $state.go('viewAllBroadcasts');
    });
}
})();

(function() {
'use strict';

angular
    .module('gecko.iosDonations')
    .controller('IosDonationsCtrl', IosDonationsCtrl);

function IosDonationsCtrl($scope, donationInfo) {
    $scope.amount = donationInfo.amount;
    $scope.broadcast = donationInfo.broadcast;
}
})();

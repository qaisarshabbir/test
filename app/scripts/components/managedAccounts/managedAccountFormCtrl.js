(function() {
'use strict';

angular
    .module('gecko.createBroadcasts')
    .controller('managedAccountFormCtrl', managedAccountFormCtrl);

function managedAccountFormCtrl($scope, $log, $timeout, CurrentUserService, ToastService, BankAccountService) {
    $scope.form = 'demographics';

    $scope.managedAccountData = {
        type: 'company'
    };

    $scope.bankData = {};

    $scope.createManagedAccount = function() {
        $scope.createManagedAccountLoading = $timeout(function() {
            $scope.form = 'bankInformation';
        }, 1000);
    };

    $scope.addBankAccount = function() {
        var bankAccountInfo = {
            routingNumber: $scope.managedAccountData.routingNumber,
            accountNumber: $scope.managedAccountData.accountNumber
        };
        $scope.createManagedAccountLoading = BankAccountService.getStripeToken(bankAccountInfo)
        .then(function(response) {
            BankAccountService.createManagedAccount($scope.managedAccountData, response.id)
            .then(function() {
                $scope.form = 'finished';
                CurrentUserService.refreshLocalProfile();
            }).catch(function(error) {
                ToastService.error('There was an error submitting the form');
                $log.debug(error);
            });
        }).catch(function(error) {
            ToastService.error('There was an error submitting the form');
            $log.debug(error);
        });
    };
}
})();

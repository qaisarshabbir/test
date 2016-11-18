(function() {
gecko.service('BankAccountService', function(stripe, ApiService) {

    function getStripeToken(accountDetails) {
        var bankAccount = {
            country: 'US',
            currency: 'USD',
            'routing_number': accountDetails.routingNumber,
            'account_number': accountDetails.accountNumber
        };

        return stripe.bankAccount.createToken(bankAccount);
    }

    function createManagedAccount(details, token) {
        var accountDetails = {
            type: details.type,
            businessName: details.businessName,
            taxId: details.taxId,
            accountToken: token,
            firstName: details.firstName,
            lastName: details.lastName,
            dob: {
                day: details.dob.day,
                month: details.dob.month,
                year: details.dob.year
            },
            last4: details.last4,
            address: {
                street1: details.address.street1,
                street2: details.address.street2,
                city: details.address.city,
                state: details.address.state,
                zip: details.address.zip
            },
            email: details.email,
            tos: details.tos,
            charity: details.charity
        };

        return ApiService.post('accounts', accountDetails, null, 1);
    }

    return {
        getStripeToken: getStripeToken,
        createManagedAccount: createManagedAccount
    };
});
})();

(function() {
'use strict';
gecko.service('ValidationService', function(ApiService, stripe) {

    function validate(type, value) {
        var path = 'validate/' + type;
        var payload = {};
        payload[type] = value;

        if (type === 'password') {
            return ApiService.post(path, payload);
        } else if (type === 'creditCardNumber') {
            return stripe.card.validateCardNumber(value);
        } else if (type === 'creditCardCVC') {
            return stripe.card.validateCVC(value);
        } else {
            var options = payload;
            return ApiService.get(path, options);
        }
    }

    return {
        validate: validate
    };
});
})();

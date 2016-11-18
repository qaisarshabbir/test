gecko.directive('zipRecordValidator', function(ApiService, ValidationService) {

    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            var type = attrs.zipRecordValidator;

            function setAsValid(bool) {
                ngModel.$setValidity('recordValid', bool);
            }

            function setAsUnique(bool) {
                ngModel.$setValidity('unique', bool);
            }

            ngModel.$parsers.push(function(value) {
                if (!value || value.length === 0) {
                    return;
                } else if (type === 'creditCardNumber' || 'creditCardCVC') {
                    var valid = ValidationService.validate(type, value);
                    setAsValid(valid);
                } else {
                    ValidationService.validate(type, value)
                    .then(function() {
                        setAsValid(true);
                        setAsUnique(true);
                    }).catch(function(error) {
                        if (error.status === 409) {
                            setAsUnique(false);
                        } else {
                            setAsValid(false);
                        }
                    });
                }

                return value;
            });
        }
    };
});

(function() {
'use strict';

var chakram = require('chakram'),
    expect = chakram.expect;

var baseUrl = 'http://api.dev.zipline.co/api/v1/';

describe('Validation', function() {
    describe('name', function() {
        var validateUrl;

        beforeEach(function() {
            validateUrl = baseUrl + 'validate/name';
        });

        it('accepts valid names', function() {
            var params = '?name=John';
            var response = chakram.get(validateUrl + params);
            return expect(response).to.have.status(200);
        });

        it('accepts names with hyphens', function() {
            var params = '?name=John-hello';
            var response = chakram.get(validateUrl + params);
            return expect(response).to.have.status(200);
        });

        it('accepts names with Unicode spaces', function() {
            var params = '?name=John%20hello';
            var response = chakram.get(validateUrl + params);
            return expect(response).to.have.status(200);
        });

        it('rejects names longer than 100 characters', function() {
            var params = '?name=';
            for (var i = 0; i < 10; i++) {
                params += '1234567890';
            }
            params += '1';
            var response = chakram.get(validateUrl + params);
            return expect(response).to.have.status(400);
        });

        it('allows names with dots', function() {
            var params = '?name=foob.toor';
            var response = chakram.get(validateUrl + params);
            return expect(response).to.have.status(200);
        });

        it('allows names with backslashes', function() {
            var params = '?name=foob\\toor';
            var response = chakram.get(validateUrl + params);
            return expect(response).to.have.status(200);
        });

        it('allows names with dashes', function() {
            var params = '?name=foo-btoor';
            var response = chakram.get(validateUrl + params);
            return expect(response).to.have.status(200);
        });

        it('rejects names with random symbols', function() {
            var params = '?name=foo%^#bar';
            var response = chakram.get(validateUrl + params);
            return expect(response).to.have.status(400);
        });
    });
});
})();

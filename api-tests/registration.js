(function() {
'use strict';

var chakram = require('chakram'),
    expect = chakram.expect;

var baseUrl = 'http://api.dev.zipline.co/api/v1/';

function getGoodRequestObject() {
    return {
        email: Math.random() + '@mailinator.com',
        password: 'Password1234',
        username: 'testuser' + Math.random()
    };
}

describe('Registration', function() {
    var registrationUrl;
    beforeEach(function() {
        registrationUrl = baseUrl + 'register';
    });

    it('allows request with good user', function() {
        var response = chakram.post(registrationUrl, getGoodRequestObject());
        return expect(response).to.have.status(200);
    });

    it('gives bad request without email', function() {
        var postBody = getGoodRequestObject();
        postBody.email = null;

        var response = chakram.post(registrationUrl, postBody);

        return expect(response).to.have.status(400);
    });

    it('gives bad request without username', function() {
        var postBody = getGoodRequestObject();
        postBody.username = null;

        var response = chakram.post(registrationUrl, postBody);

        return expect(response).to.have.status(400);
    });

    it('gives bad request without password', function() {
        var postBody = getGoodRequestObject();
        postBody.password = null;

        var response = chakram.post(registrationUrl, postBody);

        return expect(response).to.have.status(400);
    });

    it('gives bad request if username already exists', function() {
        var initialPostBody = getGoodRequestObject();
        return chakram.post(registrationUrl, initialPostBody).then(function() {
            var nextPostBody = getGoodRequestObject();
            nextPostBody.username = initialPostBody.username;
            var response = chakram.post(registrationUrl, nextPostBody);
            return expect(response).to.have.status(409);
        });
    });

    it('gives bad request if email already exists', function() {
        var initialPostBody = getGoodRequestObject();
        return chakram.post(registrationUrl, initialPostBody).then(function() {
            var nextPostBody = getGoodRequestObject();
            nextPostBody.email = initialPostBody.email;
            var response = chakram.post(registrationUrl, nextPostBody);
            return expect(response).to.have.status(409);
        });
    });
});
})();

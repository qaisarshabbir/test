describe('Profile Service', function() {
    var ProfileService,
        ApiService,
        SessionService,
        $q,
        rootScope;

    beforeEach(function() {
        module('gecko');

        inject(function(_ProfileService_, _ApiService_, _SessionService_, _$q_, _$rootScope_) {
            ProfileService = _ProfileService_;
            ApiService = _ApiService_;
            SessionService = _SessionService_;
            $q = _$q_;
            rootScope = _$rootScope_;
        });
    });

    beforeEach(inject(function($httpBackend) {
        $httpBackend.whenGET('templates/views/viewBroadcasts/explore.html').respond(200);
    }));

    describe('changePassword', function() {
        beforeEach(function() {
            spyOn(ApiService, 'post');
        });

        it('should call ApiService.post with "password"', function() {
            var currentPassword = 'current';
            var newPassword = 'new';

            ProfileService.changePassword(currentPassword, newPassword);

            var call = ApiService.post.calls.argsFor(0);
            expect(call[0]).toEqual('password');
            expect(call[1].new).toBe(newPassword);
            expect(call[1].current).toBe(currentPassword);
        });

        it('should return the result of ApiService.post', function() {
            var expected = 'foo';
            ApiService.post.and.returnValue(expected);

            var result = ProfileService.changePassword();

            expect(result).toBe(expected);
        });
    });

    describe('changeEmail', function() {
        beforeEach(function() {
            spyOn(ApiService, 'post');
        });

        it('should call ApiService.post with "email"', function() {
            var email = 'email';

            ProfileService.changeEmail(email);

            var call = ApiService.post.calls.argsFor(0);
            expect(call[0]).toEqual('users/profile/email');
            expect(call[1].email).toBe(email);
        });

        it('should return the result of ApiService.post', function() {
            var expected = 'foo';
            ApiService.post.and.returnValue(expected);

            var result = ProfileService.changeEmail();

            expect(result).toBe(expected);
        });
    });
});

describe('Session Service', function() {
    var SessionService;

    beforeEach(function() {
        module('gecko');

        inject(function(_SessionService_) {
            SessionService = _SessionService_;
        });
    });

    beforeEach(inject(function($httpBackend) {
        $httpBackend.whenGET('templates/views/viewBroadcasts/explore.html').respond(200);
    }));

    describe('get', function() {
        beforeEach(function() {
            spyOn(localStorage, 'getItem');
        });

        it('should call localStorage.getItem with prefix plus item name', function() {
            var itemName = 'item';
            var expectedPrefix = 'zipline-';

            SessionService.get(itemName);

            expect(localStorage.getItem).toHaveBeenCalledWith(expectedPrefix + itemName);
        });

        it('should return the result of localStorage.getItem if the result is not a stringified object', function() {
            var expected = 'foo';
            var itemName = 'item';
            localStorage.getItem.and.returnValue(expected);

            var result = SessionService.get(itemName);

            expect(result).toBe(expected);
        });

        it('should return the parsed result of localStorage.getItem if the result is a stringified object', function() {
            var parsedJSON = {
                foo: 'bar'
            };
            var stringifiedJSON = JSON.stringify(parsedJSON);
            var itemName = 'item';

            localStorage.getItem.and.returnValue(stringifiedJSON);

            var result = SessionService.get(itemName);

            expect(result).toEqual(parsedJSON);
        });
    });

    describe('set', function() {
        beforeEach(function() {
            spyOn(localStorage, 'setItem');
        });

        it('should call localStorage.setItem with the prefixed key and value if value is not an object', function() {
            var key = 'key';
            var value = 'foo';
            var expectedPrefix = 'zipline-';

            SessionService.set(key, value);

            expect(localStorage.setItem).toHaveBeenCalledWith(expectedPrefix + key, value);
        });

        it('should call localStorage.setItem with the prefixed key and' +
            'stringified value if value is an object', function() {
            var key = 'key';
            var value = {
                foo: 'bar'
            };
            var expectedPrefix = 'zipline-';

            SessionService.set(key, value);

            expect(localStorage.setItem).toHaveBeenCalledWith(expectedPrefix + key, JSON.stringify(value));
        });
    });

    describe('unset', function() {
        beforeEach(function() {
            spyOn(localStorage, 'removeItem');
        });

        it('should call localStorage.removeItem with prefixed key', function() {
            var key = 'item';
            var expectedPrefix = 'zipline-';

            SessionService.unset(key);

            expect(localStorage.removeItem).toHaveBeenCalledWith(expectedPrefix + key);
        });
    });

});

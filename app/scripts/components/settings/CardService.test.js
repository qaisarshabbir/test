(function() {
describe('Card Service', function() {
    var CardService,
        ApiService,
        $q,
        rootScope;

    beforeEach(function() {
        module('gecko');

        inject(function(_CardService_, _ApiService_, _$q_, _$rootScope_) {
            CardService = _CardService_;
            $q = _$q_;
            rootScope = _$rootScope_;
            ApiService = _ApiService_;
        });
    });

    beforeEach(inject(function($httpBackend) {
        $httpBackend.whenGET('templates/views/viewBroadcasts/explore.html').respond(200);
    }));

    describe('addCard', function() {
        beforeEach(function() {
            spyOn(ApiService, 'post');
        });

        it('should call ApiService.post with "card"', function() {
            var newCard = {};

            CardService.addCard(newCard);

            var call = ApiService.post.calls.argsFor(0);
            expect(call[0]).toEqual('card');
            expect(call[1]).toBe(newCard);
        });

        it('should return the result of ApiService.post', function() {
            var expected = 'foo';
            ApiService.post.and.returnValue(expected);

            var result = CardService.addCard();

            expect(result).toBe(expected);
        });
    });
    describe('getCards', function() {
        beforeEach(function() {
            spyOn(ApiService, 'get').and.returnValue($q.defer().promise);
        });

        function getSaneCard() {
            return {expMonth: '07', expYear: '2012'};
        }

        it('should call ApiService.get with "cards"', function() {
            CardService.getCards();
            expect(ApiService.get).toHaveBeenCalledWith('cards');
        });

        it('should return the data result of ApiService.get', function(done) {
            var expected = [];
            var deferred = $q.defer();
            ApiService.get.and.returnValue(deferred.promise);

            CardService.getCards().then(function(result) {
                expect(result).toEqual(expected);
                done();
            });

            deferred.resolve({data: expected});
            rootScope.$apply();
        });

        it('should format expiration month with two digits', function(done) {
            var deferred = $q.defer();
            ApiService.get.and.returnValue(deferred.promise);

            CardService.getCards().then(function(result) {
                expect(result[0].expMonth).toEqual('07');
                done();
            });

            var input =  getSaneCard();
            input.expMonth = '7';
            deferred.resolve({data: [input]});
            rootScope.$apply();
        });

        it('should format expiration month with two digits', function(done) {
            var deferred = $q.defer();
            ApiService.get.and.returnValue(deferred.promise);

            CardService.getCards().then(function(result) {
                expect(result[0].expMonth).toEqual('12');
                done();
            });

            var input =  getSaneCard();
            input.expMonth = '12';
            deferred.resolve({data: [input]});
            rootScope.$apply();
        });

        it('should format expiration year with two digits', function(done) {
            var deferred = $q.defer();
            ApiService.get.and.returnValue(deferred.promise);

            CardService.getCards().then(function(result) {
                expect(result[0].expYear).toEqual('20');
                done();
            });

            var input =  getSaneCard();
            input.expYear = '2020';
            deferred.resolve({data: [input]});
            rootScope.$apply();
        });

    });
});
})();

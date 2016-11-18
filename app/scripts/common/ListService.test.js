describe('List Service', function() {
    var ListService;

    beforeEach(function() {
        module('gecko');

        inject(function(_ListService_) {
            ListService = _ListService_;
        });
    });

    beforeEach(inject(function($httpBackend) {
        $httpBackend.whenGET('templates/views/viewBroadcasts/explore.html').respond(200);
    }));

    describe('allStatesPlusDC', function() {
        beforeEach(function() {
            allStatesPlusDC = ListService.allStatesPlusDC;
        });

        it('should have 51 items', function() {
            expect(allStatesPlusDC.length).toEqual(51);
        });
    });

    describe('cardMonths', function() {
        beforeEach(function() {
            cardMonths = ListService.cardMonths;
        });

        it('should have 12 items', function() {
            expect(cardMonths.length).toEqual(12);
        });
    });

    describe('cardCountries', function() {
        beforeEach(function() {
            cardCountries = ListService.cardCountries;
        });

        it('should include all the countries Zipline operates in', function() {
            expect(cardCountries.length).toEqual(1);
        });
    });

    describe('cardYears', function() {
        beforeEach(function() {
            cardYears = ListService.cardYears;
        });

        it('should start with the current year', function() {
            expect(cardYears[0]).toEqual(2016);
        });

        it('should include 10 years', function() {
            expect(cardYears.length).toEqual(10);
        });
    });
});

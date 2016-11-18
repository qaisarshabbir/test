var chakram = require('chakram'),
    expect = chakram.expect;

describe('Baseline', function() {
    it('should provide HTTP specific assertions', function() {
        var response = chakram.get('http://httpbin.org/get');
        return expect(response).to.have.status(200);
    });
});

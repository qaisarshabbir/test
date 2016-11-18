(function() {
gecko.service('CardService', function($http, $rootScope, stripe, ApiService) {

    function getCards() {
        return ApiService.get('cards')
        .then(function(result) {
            return result.data.map(function(card) {
                card.expMonth = card.expMonth.length < 2 ? '0' + card.expMonth : card.expMonth;
                card.expYear = card.expYear.slice(2);
                return card;
            });
        });
    }

    function deleteCard(card) {
        return ApiService.delete('card/' + card._id);
    }
    function makeDefault(card) {
        return ApiService.get('card/' + card._id + '/default');
    }

    function addCard(cardInfo) {
        var path = 'card';
        return ApiService.post(path, cardInfo);
    }

    function getStripeToken(cardDetails) {
        //convert month to 2 digits
        var month = cardDetails.expMonth.slice(0, 2);
        var card = {
            number: cardDetails.number,
            cvc: cardDetails.cvc,
            'exp_month': month, //jscs:ignore
            'exp_year': cardDetails.expYear, //jscs:ignore
            'address_zip': cardDetails.zip, //jscs:ignore
            'name': cardDetails.name
        };

        return stripe.card.createToken(card);
    }

    function updateCardDisplay() {
        $rootScope.$broadcast('card:modified');
    }

    return {
        getCards: getCards,
        deleteCard: deleteCard,
        makeDefault: makeDefault,
        addCard: addCard,
        getStripeToken: getStripeToken,
        updateCardDisplay: updateCardDisplay
    };
});
})();

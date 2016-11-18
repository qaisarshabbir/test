(function() {
'use strict';
gecko.service('MoneyService', function($q, $rootScope, ApiService, CardService,
    AuthenticationService, BroadcastService, CommentService) {

    var transaction = {
        phase: 'amount',
        amount: '',
        card: {},
        token: null
    };

    function setAmount(amount) {
        transaction.amount = amount;
        if (!transaction.card) {
            transaction.phase = 'add-card';
        } else {
            transaction.phase = 'confirm';
        }
    }

    function setPhase(phase) {
        transaction.phase = phase;
    }

    function chargeCard(amount, cardId, token, name, zip, broadcastId = BroadcastService.broadcasts.current._id) {
        var path;
        var charge = {
            amount,
            cardId,
            token,
            name,
            zip
        };
        return ApiService.post('broadcast/' + broadcastId + '/charge', charge);
    }

    function getDefaultCard() {
        CardService.getCards()
        .then(function(cards) {
            var defaultCard = cards.filter(function(card) {
                return card.default;
            });

            if (defaultCard.length > 0) {
                transaction.card = defaultCard[0];
            }
        });
    }

    return {
        transaction: transaction,
        setAmount: setAmount,
        setPhase: setPhase,
        chargeCard: chargeCard,
        getDefaultCard: getDefaultCard
    };

});
})();

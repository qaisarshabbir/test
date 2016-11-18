(function() {
'use strict';
gecko.run(function(PubNub) {
    PubNub.init({
        publish_key: 'pub-c-da2af82c-cd20-4cd4-bee2-ba481ef100d3', //jscs:ignore
        subscribe_key: 'sub-c-df80a788-1b6d-11e5-ac22-0619f8945a4f' //jscs:ignore
    });
});
})();

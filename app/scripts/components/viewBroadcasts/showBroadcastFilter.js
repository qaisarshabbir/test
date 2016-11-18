(function() {
'use strict';

gecko.filter('visibleBroadcasts', function() {
    return function(broadcasts) {
        return broadcasts.filter(function(broadcast) {
            return broadcast.type === 'vimeo' || broadcast.type === 'archive' || broadcast.type === 'live';
        });
    };
});
})();

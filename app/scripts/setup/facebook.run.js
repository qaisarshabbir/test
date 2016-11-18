(function() {
'use strict';
gecko.run(function($window, FacebookService) {

    $window.fbAsyncInit = function() {
        // Executed when the SDK is loaded

        FB.init({
            appId: '185697241633463',
            channelUrl: 'app/templates/channel.html',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.4'
        });

        FacebookService.watchLoginChange();
    };

    (function(d) {
        // load the Facebook javascript SDK
        var js;
        var id = 'facebook-jssdk';
        var ref = d.getElementsByTagName('script')[0];

        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = '//connect.facebook.net/en_US/sdk.js';

        ref.parentNode.insertBefore(js, ref);

    }(document));
});
})();

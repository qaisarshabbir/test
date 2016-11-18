var depends = [
    'gecko.iosDonations',
    'gecko.messages',
    'gecko.createBroadcasts',
    'gecko.viewBroadcasts',
    'gecko.profile',
    'pubnub.angular.service',
    'ui.router',
    'ngSanitize',
    'angular-stripe',
    'ngMessages',
    'ui.bootstrap',
    'toastr',
    'ngFileUpload',
    'ngImgCrop',
    'luegg.directives',
    'ngCsv'
];

var gecko = angular.module('gecko', depends);

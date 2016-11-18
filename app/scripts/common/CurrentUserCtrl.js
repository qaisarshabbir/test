(function() {
'use strict';

gecko.controller('CurrentUserCtrl', function(CurrentUserService) {
    var vm = this;
    vm.profile = CurrentUserService.currentUserProfile;
});

})();

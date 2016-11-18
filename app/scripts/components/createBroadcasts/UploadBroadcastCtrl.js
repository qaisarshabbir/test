(function() {
'use strict';

angular
    .module('gecko.createBroadcasts')
    .controller('UploadBroadcastCtrl', UploadBroadcastCtrl);

function UploadBroadcastCtrl($scope, $log, $timeout, Upload, BroadcastService, ToastService) {
    $scope.fileName = 'No file chosen';
    $scope.broadcastInfo = {};

    $scope.onFileSelect = function($files) {
        $scope.selectedFile = $files;
        $scope.fileName = $files[0].name;
    };

    $scope.uploadFiles = function(file, broadcastInfo) {
        $scope.f = file;

        if (file) {
            $scope.uploadBroadcast = Upload.upload({
                url: 'http://api.dev.zipline.co/api/v2/broadcast',
                data: {
                    file: file,

                },
                headers: {
                    'x-zipline-video': 'upload'
                }
            });
             console.log(file);
            $scope.uploadBroadcast
            .then(function(response) {
                BroadcastService.updateBroadcastInformation(response.data, broadcastInfo.title, broadcastInfo.affiliate)
                .then(function(response) {
                    ToastService.success('Broadcast uploaded');
                }).catch(function(error) {
                    $log.debug(error);
                });
            }, function(error) {
                $log.debug(error);
                ToastService.error('There was a problem uploading your video');
                $scope.errorMsg = response.status;
                alert($scope.errorMsg);
            }, function(evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    };
}
})();

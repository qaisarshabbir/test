(function() {
'use strict';

gecko.factory('ObjectMappingService', function() {
    function mapObject(obj, objectToBeCopied) {
        var property;

        for (property in obj) {
            if (!objectToBeCopied.hasOwnProperty(property)) {
                obj[property] = undefined;
            }
        }

        for (property in objectToBeCopied) {
            if (objectToBeCopied.hasOwnProperty(property)) {
                obj[property] = objectToBeCopied[property];
            }
        }
        return obj;
    }

    return {
        mapObject: mapObject
    };
});
})();

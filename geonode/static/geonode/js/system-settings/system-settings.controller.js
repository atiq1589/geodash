(function() {
    angular
        .module('SystemSettingsApp')
        .controller('SystemSettingsController', SystemSettingsController);

    SystemSettingsController.$inject = ['$scope', 'SettingsService'];

    function SystemSettingsController($scope, SettingsService) {

        var systemSettings = SettingsService.getSystemSettings();
        var layerSettings = SettingsService.getLayers();
        $scope.vectorLayers = [];
        $scope.rasterLayers = [];
        $scope.vectorLayer = undefined;
        $scope.rasterLayer = undefined;
        var layersObject;

        $scope.layerSettingSave = function(layerId,propertyName) {
            var data = {
                'uuid': layerId,
                'settings_code': propertyName,
            };
            SettingsService.saveSystemSettings(data);
        };

        function checkSelectedLayerAttrhave(uuid) {
            var addressColumnsStatus = SettingsService.getAddressAttributes(uuid);
            addressColumnsStatus.then(function(value) {
                if (value.status == 'invalid') {
                    var columns = value.columns.toString().replaceAll(',', ', ');
                    $scope.layerStatusMsg = columns + " are missing!";
                }

            }, function(error) {
                // This is called when error occurs.
            });
        }

        function getSystemSetting() {
            systemSettings.then(function(value) {
                $.each(value, function(index, element) {
                    if (element.settings_code == "location") {
                        $scope.vectorLayer = element.content_object.uuid;
                        checkSelectedLayerAttrhave(element.content_object.uuid);
                    }
                    if (element.settings_code == "elevation") {
                        $scope.rasterLayer = element.content_object.uuid;
                    }
                });

            }, function(error) {
                // This is called when error occurs.
            });
        }

        function getLayers() {
            layerSettings.then(function(value) {
                layersObject = value.objects;
                $.each(layersObject, function(index, element) {
                    var title = element.title;
                    if (element.title.length > 22) {
                        title = element.title.substring(0, 25) + "...";
                    }
                    $scope.vectorLayers.push({ id: element.uuid, title: title });
                    $scope.rasterLayers.push({ id: element.uuid, title: title });
                });
            }, function(error) {
                // This is called when error occurs.
            });
        }

        function inIt(){
            getSystemSetting();
            getLayers();
        }

        inIt();

        $scope.changedValue = function() {
            checkSelectedLayerAttrhave($scope.vectorLayer);
        };

    }
})();
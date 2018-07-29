angular.module("app.helpers").directive('layerStyleEditor', [
    function () {
        return {
            restrict: 'E',
            scope: {
                layerStyle: '=',
                featureType: '=',
                isWeightedPoint: '='
            },
            templateUrl: 'static/Templates/layerStyleEditor.html'
        };
    }
]);

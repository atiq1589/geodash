
mapModule.directive('routePopUpDirective', [
    'mapService', 'layerService', '$timeout','mapToolsFactory','$http','SurfMap','$cookies',
    function (mapService, layerService, $timeout,mapToolsFactory,$http,SurfMap,$cookies) {
        return {
            restrict: 'EA',
            scope: {

            },
            templateUrl: "/static/Templates/Tools/Map/routeDirectionOverlay.html",
            controller: [
                '$scope','$rootScope','mapService','$timeout','$compile','surfToastr',
                function ($scope,$rootScope,mapService,$timeout,$compile,surfToastr) {
                    $scope.sourceCoordinates = [];
                    $scope.destinationCoordinates = [];
                    var sourceFeature = {};
                    var destinationFeature = {};
                    var routeFeature={};
                    $scope.coordinate = [];
                    $scope.layers=[];
                    var container, content, close, popup;
                    container = document.getElementById('route-popup');
                    content = document.getElementById('route-popup-content');
                    closer = document.getElementById('route-popup-closer');
                    container.style.visibility = 'none';

                    var overlay = new ol.Overlay({
                        element: container,
                        autoPan: true,
                        autoPanAnimation: {
                            duration: 250
                        }
                    });
                    var
                    vectorSource = new ol.source.Vector(),
                    vectorLayer = new ol.layer.Vector({
                        source: vectorSource
                    });

                    var sourceStyle = new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 46],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            opacity: 0.75,
                            src: '/static/geonode/img/marker.png'
                        }),
                        text: new ol.style.Text({
                            font: '12px Calibri,sans-serif',
                            fill: new ol.style.Fill({color: '#000'}),
                            stroke: new ol.style.Stroke({
                                color: '#fff', width: 2
                            }),
                            text: 'Source'
                        })
                    });
                
                    var destinationStyle = new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 46],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            opacity: 0.75,
                            src: '/static/geonode/img/marker.png'
                        }),
                        text: new ol.style.Text({
                            font: '12px Calibri,sans-serif',
                            fill: new ol.style.Fill({color: '#000'}),
                            stroke: new ol.style.Stroke({
                                color: '#fff', width: 2
                            }),
                            text: 'Destination'
                        })
                    });

                    var map=mapService.getMap(); 
                    map.getViewport().addEventListener('contextmenu', function (evt) {
                        $scope.layers=[];
                        var layers=mapService.getLayers();
                        angular.forEach(layers,function(data){
                            if(data.ShapeType==='point'){
                                $scope.layers.push(data);
                            }
                        });
                        var coordinate = map.getEventCoordinate(evt);
                        var html = '<ul class="list-group">\n' +
                        '                <li class="list-group-item" ng-click="call(true)" style="cursor: pointer" ng-hide="sourceCoordinates.length>0">Direction from here </li>\n' +
                        '                <li class="list-group-item" ng-click="call(false)" style="cursor: pointer" \n'+  'ng-show="sourceCoordinates.length>0">Direction to there </li>\n' +
                        '                <li class="list-group-item" ng-show="sourceCoordinates.length>0"> \n' +
                        '                    <div class="dropdown">\n' +
                        '                        <span class="dropbtn" style="cursor: pointer"\n' + '>Direction from layers</span>\n' +
                        '                        <div class="dropdown-content">\n' +
                        '                            <a style="cursor: pointer"ng-repeat="(key, value) in layers track by $index" \n'+
                        ' ng-click="routeFromLayer(value.Name)">[{value.Name}]</a>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </li>\n' +
                        '<li class="list-group-item" style="cursor: pointer"  ng-show="sourceCoordinates.length>0" ng-click="resetAll()">Reset All</li>'+
                        '            </ul>';
                    var linkFn = $compile(html);
                    var element = linkFn($scope);

                    $timeout(function () {
                        var myEl = angular.element(document.querySelector('#route-popup-content'));
                        myEl.empty();
                        myEl.append(element);
                        overlay.setPosition(coordinate);
                    });

                    $scope.coordinate= coordinate;
                    evt.preventDefault();
                    container.style.visibility = 'visible';

                    });    
                    
                    function addBlankOverlay(){
                        closer.onclick = function(e) {
                            overlay.setPosition(undefined);
                            closer.blur();
                            return false;
                        };
                        map.addOverlay(overlay);
                        overlay.setPosition(undefined);
                    }

                    function addBlankVectorLayer(){
                        map.addLayer(vectorLayer);
                    }

                    function inIt(){
                        addBlankOverlay();
                        addBlankVectorLayer();
                    }

                    inIt();

                    function addRoutePlyLine(origin,destination){
                        $http.post('https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&key=AIzaSyAFQEpBZ0v2CEvRYzlFX0ugObBTgmA9_10').then(function (response) {
                            if(response.data.status==="OK"){
                                var polyline = response.data.routes[0].overview_polyline.points;
                                var route = /** @type {ol.geom.LineString} */ (new ol.format.Polyline({
                                    factor: 1e5
                                }).readGeometry(polyline, {
                                    dataProjection: 'EPSG:4326',
                                    featureProjection: 'EPSG:3857'
                                }));
                                if(!angular.equals(routeFeature,{}))
                                    vectorLayer.getSource().removeFeature(routeFeature);
                                routeFeature = new ol.Feature({
                                    type: 'route',
                                    geometry: route
                                });
                                routeFeature.setStyle(new ol.style.Style({
                                    stroke: new ol.style.Stroke({
                                        width: 6, color: [255, 0, 0, 0.8]
                                    })
                                }));
                                vectorSource.addFeature(routeFeature);
                            }else {
                                if(!angular.equals(routeFeature,{}))
                                    vectorLayer.getSource().removeFeature(routeFeature);
                                    surfToastr.error('Google Map can not give you direction', 'Error');
                                routeFeature={};
                            }
                        });
                    }

                    function addFeatureToVectorLayer(feature){
                        vectorSource.addFeature(feature);
                    }

                    function removeFeature(feature){
                        vectorLayer.getSource().removeFeature(feature)
                    }

                    $scope.call = function (bool) {
                        var feature = new ol.Feature(
                            new ol.geom.Point($scope.coordinate)
                        );
                        if (bool) {
                            $scope.sourceCoordinates = $scope.coordinate;
                            feature.setStyle(sourceStyle);
                            sourceFeature = feature;
                        } else {
                            if (!angular.equals(destinationFeature, {}))
                                removeFeature(destinationFeature);
                            $scope.destinationCoordinates = $scope.coordinate;
                            feature.setStyle(destinationStyle);
                            destinationFeature = feature;
                            var origin = ol.proj.transform(angular.copy($scope.sourceCoordinates), 'EPSG:3857', 'EPSG:4326').reverse().join(',');
                            var destination = ol.proj.transform(angular.copy($scope.destinationCoordinates), 'EPSG:3857', 'EPSG:4326').reverse().join(',');
                            addRoutePlyLine(origin,destination);
                        }
                        addFeatureToVectorLayer(feature);
                        closer.onclick();
                    };
                    $scope.routeFromLayer=function(layer){
                        var layerName=layer.split(':')[1];
                        var origin = ol.proj.transform(angular.copy($scope.sourceCoordinates), 'EPSG:3857', 'EPSG:4326').reverse();
                        $http.post("/locations/api/nearestpoint",{
                            "layer_name": layerName,
                            "latitude": origin[0],
                            "longitude": origin[1]
                        },{
                            headers: {
                                "X-CSRFToken": $cookies.get('csrftoken')
                            }
                        }).then(function(response){
                            if(response.data.length>0){
                                var point=response.data[0][0];
                                var destination=point.latitude+','+point.longitude;
                                addRoutePlyLine(origin,destination);
                                var Point3857=[point.longitude,point.latitude];
                                var Point4236=ol.proj.transform(Point3857,'EPSG:4326', 'EPSG:3857');
                                var feature = new ol.Feature(
                                    new ol.geom.Point(Point4236)
                                );
                                if (!angular.equals(destinationFeature, {}))
                                removeFeature(destinationFeature);
                                feature.setStyle(destinationStyle);
                                destinationFeature=feature;
                                addFeatureToVectorLayer(feature);
                                closer.onclick();
                            }
                            
                        });
                    };
                    $scope.resetAll=function(){
                        if (!angular.equals(sourceFeature, {}))
                            removeFeature(sourceFeature);
                        if(!angular.equals(destinationFeature, {}))
                            removeFeature(destinationFeature);
                        if(!angular.equals(routeFeature,{}))
                            vectorLayer.getSource().removeFeature(routeFeature);
                        $scope.sourceCoordinates = [];
                        $scope.destinationCoordinates = [];
                        sourceFeature = {};
                        destinationFeature = {};
                        routeFeature={};
                        $scope.coordinate = [];
                        $scope.layers=[];
                        closer.onclick();
                    };
                }
            ]
        };
    }
]);
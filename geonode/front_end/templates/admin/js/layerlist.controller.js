(function(){
    angular.module('layerApp').controller('layerListController',
    function($scope,layerService,uiGridConstants,$timeout){
        $scope.getLayerListUrl="/static/admin/js/layers.json";
        $scope.search = {
            text: ""
        };
        $scope.permissionLevel='All';
        $scope.rowFilter = function( renderableRows ){
            var matcher = new RegExp($scope.search.text.toLowerCase());
            renderableRows.forEach( function( row ) {
              var match = false;
              var permissionLevelMatch=false;
              [ 'Name', 'PermittedTo','LayerType','PermissionLevel','Date']
              .forEach(function( field ){
                if ( row.entity[field].toLowerCase().match(matcher) ){
                  match = true;
                }
              });
              if((row.entity['PermissionLevel'].toLowerCase()===$scope.permissionLevel.toLowerCase())
                    || $scope.permissionLevel.toLowerCase()==='All'.toLowerCase()
                ){
                    permissionLevelMatch=true;
                }
                if(!match || !permissionLevelMatch ){
                    row.visible=false;
                }
            });
            return renderableRows;
          };
        $scope.gridOption = {
            paginationPageSizes: [25, 50, 75, 100],
            paginationPageSize: 25,
            enableRowSelection: false,
            enableSelectAll: false,
            rowHeight:40,
            data: [],
            enableGridMenu: false,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
            columnDefs: [
                { field: 'Id' , visible: false},
                { field: 'Name',displayName : 'Layer Name' },
                { field: 'PermittedTo',displayName : 'Permitted To' },
                { field: 'LayerType',displayName : 'Layer Type' },
                { field: 'PermissionLevel',displayName : 'Permission Level' },
                { field: 'Date',displayName : 'Date' },
                {field : 'Status',displayName:'Status',visible:false},
                {
                    field: 'Action',
                    cellTemplate: '<a class="btn btn-sm btn-primary top edit-btn" style="margin : 5px"' +
                        ' ng-click="grid.appScope.gridOption.publishLayer(row)" ' +
                        ' data-placement="top" data-toggle="tooltip" ' +
                        'ng-disabled="row.entity.Status==\'Published\'"'+
                        ' data-original-title="Publish">  ' +
                        'Publish' +
                        ' </a> ' +
                        '<a class="btn btn-sm btn-danger top remove-btn" style="margin : 5px"' +
                        'data-placement="top" data-toggle="tooltip" ' +
                        'ng-click="grid.appScope.gridOption.unpublishLayer(row)" ' +
                        'ng-disabled="row.entity.Status==\'Unpublished\'"'+
                        'data-original-title="Unpublish"> ' +
                        ' Unpublish' +
                        '</a>'
                }
            ]
        };
        $scope.gridOption.onRegisterApi = function(gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerRowsProcessor( $scope.rowFilter, 200 );
        };
        $scope.gridOption.publishLayer = function (row) {
            alert('edit-user');
        };
        $scope.gridOption.unpublishLayer = function (row) {
            alert('delete-user');
        };
        $scope.filterLayer=function(){
            $timeout(function(){
                $scope.gridApi.grid.refresh();             
            });
        };
        $scope.setPermissionLevel=function(permissionLevel){
            $scope.permissionLevel=permissionLevel;
            $timeout(function(){
                $scope.gridApi.grid.refresh();             
            });
        };
        function getAllLayers(){
            layerService.getAllLayers($scope.getLayerListUrl).then(function(response){
                $scope.gridOption.data=response;
            },function(error){
                console.log(error);
            });
        }

        function inIt(){
            getAllLayers();
        }
        inIt();
    });
})();
(function(){
    angular.module('userApp').controller('userListController', function($scope, uiGridConstants) {
        $scope.user={
            Sector : 'Government',
            Organization : 'LGED',
            Department : 'Ministry',
            Section : undefined,
            IsAdminUser:false
        };
        $scope.gridOption = {
            paginationPageSizes: [25, 50, 75, 100],
            paginationPageSize: 25,
            rowHeight:40,
            data: [
                {Name : 'Rudra',Section: 'section',Role :'GIS'},
                {Name : 'Rudra',Section: 'section',Role :'GIS'},
                {Name : 'Rudra',Section: 'section',Role :'GIS'},
                {Name : 'Rudra',Section: 'section',Role :'GIS'}
            ],
            enableGridMenu: true,
            exporterCsvFilename: self.layerName + '.csv',
            enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
            columnDefs: [
                { field: 'Name' },
                { field: 'Section' },
                {field: 'Role'},
                {
                    field: 'Action',
                    cellTemplate: '<a class="btn btn-sm btn-default top edit-btn" style="margin : 5px"' +
                        ' ng-click="grid.appScope.gridOption.editUser(row)" ' +
                        ' data-placement="top" data-toggle="tooltip" ' +
                        ' data-original-title="Edit">  ' +
                        '<span class="glyphicon glyphicon-pencil"></span> ' +
                        ' </a> ' +
                        '<a class="btn btn-sm btn-default top remove-btn" style="margin : 5px"' +
                        'data-placement="top" data-toggle="tooltip" ' +
                        'ng-click="grid.appScope.gridOption.deleteUser(row)" ' +
                        'data-original-title="Delete"> ' +
                        '<i class="fa fa-trash-o "></i> ' +
                        '</a>'
                }
            ]
        };
        $scope.columnSetting = {
            id: { ignore: true }
        };
        $scope.gridOption.editUser = function (row) {
            alert('edit-user');
        };
        $scope.gridOption.deleteUser = function (row) {
            alert('delete-user');
        };
        $scope.createUSer=function(){
            console.log($scope.user);
        };
    
    });
})();
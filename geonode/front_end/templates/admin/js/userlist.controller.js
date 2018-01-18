(function(){
    angular.module('userApp').controller('userListController',
     function($scope, uiGridConstants,userService) {
        $scope.user={};
        $scope.userInfoUrl="/static/admin/js/user.json";
        $scope.gridOption = {
            paginationPageSizes: [25, 50, 75, 100],
            paginationPageSize: 25,
            rowHeight:40,
            data: [],
            enableGridMenu: true,
            exporterCsvFilename: self.layerName + '.csv',
            enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
            columnDefs: [
                {field : "Id",visible:false},
                {field: 'Name' },
                {field: 'Section' },
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
        $scope.gridOption.editUser = function (row) {
            alert('edit-user');
        };
        $scope.gridOption.deleteUser = function (row) {
            alert('delete-user');
        };
        $scope.createUser=function(){
            console.log($scope.user);
            userService.createUser("/",$scope.user).then(function(response){
                console.log(response);
            },function(error){
                console.log(error);
            });
        };

        function getUserInformation(){
            userService.getUserInformation($scope.userInfoUrl).then(function(response){
                $scope.gridOption.data=response.userlist;
                $scope.user=response.userCreationInfo;
            },function(error){
                console.log(error);
            });
        }

        function inIt(){
            getUserInformation();
        }

        inIt();
    
    });
})();
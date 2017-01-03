var app=angular.module('angluerTabs',[]);
app.controller('listdata',function ($scope,$http) {
    $scope.view=[];
    $http.get('/view').success(function (res) {
        $scope.view=res;
    });
});
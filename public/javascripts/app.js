var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/contacts', {
            templateUrl: '../contacts.html'
        })

        .when('/home', {
            templateUrl: '../home.html',
            controller: 'myController'
        })

        .when('/update/:id', {
            templateUrl: '../update.html',
            controller: 'myController'
        });

}]);

myApp.controller('myController', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $location, $routeParams) {
    $scope.formData = {};
    $scope.newData = {};
    $scope.path = $routeParams.path();
    console.log($scope.path);
    $scope.id = $scope.path.split('/').pop();
    console.log($scope.id);
    $scope.addContact = function () {
        console.log($scope.formData);
        $http({
            method: 'POST',
            url: '/api',
            data: $scope.formData
        }).then(successCallback, errorCallback);
        function successCallback(success) {
            $scope.formData = {};
            $scope.details = success.data;
            console.log('Data stored');
            $location.path('../home.html');
        }
        function errorCallback() {
            console.log('Error');
        }
    };

    //READ THE DATA

    $http({
        method: 'GET',
        url: '/api'
    }).then(successCallback, errorCallback);
    function successCallback(success) {
        $scope.details = success.data;
    }
    function errorCallback(err) {
        console.log(err);
        console.log('Erorr in Reading');
    }



    //DELETE THE DATA
    $scope.delete = function (id) {
        $http({
            method: 'GET',
            url: '/api/delete/' + id
        }).then(successCallback, errorCallback);
        function successCallback(success) {
            $scope.details = success.data;
        }
        function errorCallback(err) {
            console.log(err);
        }
    };

    //update data
    $scope.updateContact = function () {
        console.log($scope.newData);
        console.log($scope.id);
        var id = $scope.id;
        $http({
            method: 'post',
            url: `/api/updatedata/${id}`,
            data: $scope.newData
        }).then((success) => {
            console.log('Data updated');
        }, (err) => {
            console.log('Error occured');
        })
    };

}]);




var basicapp = angular.module('app', ['ngRoute']);

basicapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'pages/home.htm'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

basicapp.controller('MainController', function($scope) {

});

var basicapp = angular.module('app', ['ngRoute']);

basicapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'pages/home.htm'
        })
        .when('/page', {
            controller: 'MainController',
            templateUrl: 'pages/page.htm'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

basicapp.controller('MainController', function($scope) {

});

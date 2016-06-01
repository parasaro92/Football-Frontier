var myApp = angular.module('myApp',
  ['ngRoute', 'ngResource'])

myApp.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.
    when('/', {
      templateUrl: 'pages/match.html',
      controller: 'MatchCtrl'
    }).
    when('/league', {
      templateUrl: 'views/register.html',
      // controller: 'RegistrationController'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
var myApp = angular.module('myApp',['ngRoute', 'ngResource']);

myApp.config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
  $httpProvider.defaults.headers.get = { 'X-Auth-Token' : 'e3645ed0f9d647b09d963cb8bdb68ec7' }

  $routeProvider.
    when('/', {
      templateUrl: 'pages/league.html',
      controller: 'MatchCtrl',
      controllerAs: 'match'
    }).
    when('/league/:uniqID', {
      templateUrl: 'pages/leagueDetails.html',
      controller: 'DetailsCtrl',
      controllerAs: 'details'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

myApp.controller('MatchCtrl', function(FootballService){

  var vm = this;
  vm.match = FootballService.query(function(data){
  // vm.add = FootballService.name;
  });
  console.log(vm.match);
});

myApp.controller('DetailsCtrl', function($routeParams, $resource){

  // var vm = this;
  // vm.id = $routeParams.uniqueID;
  // vm.league_details = FootballService.query(function(data){
  // // vm.add = FootballService.name;
  // });
  // console.log(vm.league_details);

  var vm = this;
  var id = $routeParams.uniqID;
  var leagueDetailsResource = $resource('http://api.football-data.org/v1/soccerseasons/'+ id +'/teams');
  vm.league_details = leagueDetailsResource.get();
  console.log(vm.league_details);
});


myApp.service('FootballService', function($resource){
  return $resource('http://api.football-data.org/v1/soccerseasons');
});
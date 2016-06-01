
myApp.controller('MatchCtrl', function($resource, FootballService){

  var vm = this;
  vm.match = FootballService.query(function(data){
  // vm.add = FootballService.name;
  });
  console.log(vm.match);
});

myApp.controller('MatchCtrl', function($resource, FootballService){

  var vm = this;
  vm.match = FootballService.query(function(data){
  // vm.add = FootballService.name;
  });
  console.log(vm.match);
});


myApp.service('FootballService', function($resource){
  return $resource('http://api.football-data.org/v1/soccerseasons');
});
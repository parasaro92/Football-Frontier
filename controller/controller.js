
myApp.controller('MatchCtrl', function(FootballService){

  var vm = this;
  // vm.match = FootballService.query(function(data){
  // // vm.add = FootballService.name;
  // });
  // console.log(vm.match);
  var promiseRsp = FootballService.getLeagues();
  promiseRsp.then(function(data){
    console.log(data);
    vm.matches = data;
  },function(err){
    console.log(err);
  });
});

myApp.controller('DetailsCtrl', function($routeParams, $resource, FootballService){


  var vm = this;
  // var id = $routeParams.uniqID;
  // var leagueDetailsResource = $resource('http://api.football-data.org/v1/soccerseasons/'+ id +'/teams');
  // vm.league_details = leagueDetailsResource.get();
  // console.log(vm.league_details);
  // vm.teams = FootballService.getData(myApi);
  // console.log(vm.teams);

  

  vm.api = FootballService.Api;
  console.log(vm.api);
  
  vm.getTeamData = $resource(vm.api).get();
  console.log(vm.getTeamData);

  vm.getTeamSquad = $resource(vm.api + '/players').get();
  console.log(vm.getTeamSquad); 

  vm.getTeamFixtures = $resource(vm.api + '/fixtures').get();
  console.log(vm.getTeamFixtures);
});

myApp.controller('TableCtrl', function($routeParams, $resource, FootballService){


  var vm = this;
  // var id = $routeParams.uniqID;
  // var leagueDetailsResource = $resource('http://api.football-data.org/v1/soccerseasons/'+ id +'/teams');
  // vm.league_details = leagueDetailsResource.get();
  // console.log(vm.league_details);

  vm.league_table = FootballService.getLeague($routeParams.uniqID);
  console.log(vm.league_table);
  var getFixtures = FootballService.getFixtures($routeParams.uniqID);
  console.log(vm.getFixtures);
  getFixtures.then(function(data){
    vm.league_details = data;
  },function(){

    console.log('Error while fetching data')
  })
  // details
  vm.getApi = function(api){
    FootballService.Api = api;
    console.log("api");
  }
  // FootballService.api = Api;
});


myApp.service('FootballService', function($resource, $q){

  var vm = this; 

  vm.getLeagues = function() {
    
    var resObj =  $resource('http://api.football-data.org/v1/soccerseasons');
    var rsp = resObj.query();
    var deferred = $q.defer();
    rsp.$promise.then(function(data){
      // console.log(data);
      var len = data.length;
      for(var i=0; i<len; i++){
        ObjLeague = data[i];
        // ObjLeague.caption = ObjLeague.caption.match(/^\d?\.?\s?(.​*)\s[0-9\/]*​$/);
      }
      deferred.resolve(data);
    },function(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }

  vm.getFixtures = function(myid){

    var resObj = $resource('http://api.football-data.org/v1/soccerseasons/:id/fixtures');
    var rsp = resObj.get({id:myid});
    var deferred = $q.defer();
    rsp.$promise.then(function(data){
      console.log(data);
      var len = data.fixtures.length;
      console.log(len);
      data.fixtures = data.fixtures.reverse();
      for(i=0;i<len;i++){
        objFixtures = data.fixtures[i];
      }
      deferred.resolve(data);
    },function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  }

  vm.getLeague = function(myid){

    var resObj = $resource('http://api.football-data.org/v1/soccerseasons/:id/leagueTable');
    return resObj.get({id:myid});
  }

  vm.getTeam = function(myid){

    var resObj = $resource('http://api.football-data.org/v1/teams/:id');
    return resObj.get({id:myid});
  }

  // vm.getData = function(myApi){
  //   var resObj = $resource(myApi).get();
  //   console.log(resObj);
  // }

  vm.Api = '';
});
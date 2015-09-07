(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('SeasonsNewController', SeasonsNewController);

  SeasonsNewController.$inject = ['$scope', 'season', '$state'];

  function SeasonsNewController($scope, season, $state) {
    $scope.season = season;
    $scope.save = save;

    function save() {
      $scope.season.$save().then(function(res){
        $state.go('seasons.list');
        console.log(res);
      }, function(errors){
        $scope.errors = errors;
      });
    }
  }
})();

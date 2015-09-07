(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('SeasonsDeleteController', SeasonsDeleteController);

  SeasonsDeleteController.$inject = ['$scope', 'season', '$state'];

  function SeasonsDeleteController($scope, season, $state) {
    $scope.season = season;
    $scope.confirmDelete = confirmDelete;

    function confirmDelete() {
      $scope.season.$delete().then(function(){
        $state.go('seasons.list');
      });
    }
  }
})();

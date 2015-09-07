(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('SeasonsShowController', SeasonsShowController);

  SeasonsShowController.$inject = ['$scope', 'season'];

  function SeasonsShowController($scope, season) {
    $scope.season = season;
  }
})();

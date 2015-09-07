(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('SeasonsIndexController', SeasonsIndexController);

  SeasonsIndexController.$inject = ['$scope', 'seasons', 'organization'];

  function SeasonsIndexController($scope, seasons, organization) {
    $scope.seasons = seasons;
    $scope.organization = organization;
  }
})();

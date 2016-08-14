(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('BankingIndexController', BankingIndexController);

  BankingIndexController.$inject = ['$scope', 'organization', 'banking'];

  function BankingIndexController($scope, organization, banking) {
    $scope.modelKeys = [
      {'key':'label', 'label':'Bank Name', 'type':'input'},
      {'key':'country', 'label':'Bank Country', 'type':'select'},
      {'key':'label', 'label':'Bank Name', 'type':'input'},
    ];

    $scope.organization = organization;
    $scope.banking = banking;
  }
})();
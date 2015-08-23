(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('OrganizationsShowController', OrganizationsShowController);

  OrganizationsShowController.$inject = ['$scope','organization'];

  function OrganizationsShowController($scope, organization) {
    $scope.organization = organization;
  }
})();
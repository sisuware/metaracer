(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('MembersIndexController', MembersIndexController);

  MembersIndexController.$inject = ['$scope', 'organization', 'members'];

  function MembersIndexController($scope, organization, members) {
    $scope.members = members;
    $scope.organization = organization;
  }
})();
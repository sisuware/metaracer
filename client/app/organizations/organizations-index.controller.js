(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('OrganizationsIndexController', OrganizationsIndexController);

  OrganizationsIndexController.$inject = ['$scope','Organizations', 'socket'];

  function OrganizationsIndexController($scope, Organizations, socket) {
    $scope.organizations = Organizations.query();

    socket.syncUpdates('organization', $scope.organizations);

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('organization');
    });
  }
})();
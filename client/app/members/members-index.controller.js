(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .controller('MembersIndexController', MembersIndexController);

  MembersIndexController.$inject = ['$scope', 'organization', 'Members', 'socket'];

  function MembersIndexController($scope, organization, Members, socket) {
    socket.watch('member').then(fetchMembers);

    $scope.organization = organization;

    function fetchMembers() {
      Members.query().$promise.then(function(data){
        $scope.members = data;
      });
    }

    fetchMembers();


  }
})();
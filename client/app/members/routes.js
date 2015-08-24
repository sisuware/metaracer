(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    organizationResolve.$inject = ['Organizations', '$stateParams'];
    membersResolve.$inject = ['Members', '$stateParams']; 

    function organizationResolve(Organizations, $stateParams) {
      return Organizations.get({'id': $stateParams.id});
    }

    function membersResolve(Members, $stateParams) {
      return Members.query()
    }

    $stateProvider
      .state('members', {
        url: '/organizations/:id/members',
        templateUrl: 'app/members/index.html',
        controller: 'MembersIndexController',
        authenticate: true,
        resolve: {
          organization: organizationResolve,
          members: membersResolve
        }
      });
  }
})();
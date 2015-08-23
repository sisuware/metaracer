(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    newOrganizationResolve.$inject = ['Organizations'];
    userResolve.$inject = ['Auth'];
    organizationResolve.$inject = ['Organizations', '$stateParams'];
    membersResolve.$inject = ['Members', '$stateParams'];

    function newOrganizationResolve(Organizations) {
      return new Organizations();
    }

    function userResolve(Auth) {
      return Auth.getCurrentUser();
    }  

    function organizationResolve(Organizations, $stateParams) {
      return Organizations.get({'id': $stateParams.id});
    }

    function membersResolve(Members, $stateParams) {
      return Members.query()
    }

    $stateProvider
      .state('organizations', {
        url: '/organizations',
        templateUrl: 'app/organizations/index.html',
        controller: 'OrganizationsIndexController'
      })
      .state('newOrganization', {
        url: '/organizations/new',
        templateUrl: 'app/organizations/new.html',
        controller: 'OrganizationsNewController',
        authenticate: true,
        resolve: {
          organization: newOrganizationResolve,
          user: userResolve
        }
      })
      .state('organization', {
        url: '/organizations/:id',
        templateUrl: 'app/organizations/show.html',
        controller: 'OrganizationsShowController',
        authenticate: true,
        resolve: {
          organization: organizationResolve
        }
      })
      .state('organizationForms', {
        url: '/organizations/:id/forms',
        templateUrl: 'app/organizations/show.html',
        controller: 'OrganizationsShowController',
        authenticate: true,
        resolve: {
          organization: organizationResolve
        }
      })
      .state('organizationMembers', {
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
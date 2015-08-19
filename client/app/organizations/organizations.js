'use strict';

angular.module('metaracerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('organizations', {
        url: '/organizations',
        templateUrl: 'app/organizations/organizations.html',
        controller: 'OrganizationsCtrl'
      });
  });
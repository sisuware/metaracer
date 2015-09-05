(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    $stateProvider
      .state('membership', {
        url: '/membership',
        templateUrl: 'app/membership/layout.html',
        //controller: 'DashboardController',
        authenticate: true
      })
      .state('membership.new', {
        url: '/new',
        templateUrl: 'app/membership/new.html',
        //controller: 'DashboardController',
        authenticate: true
      });

  }
})();
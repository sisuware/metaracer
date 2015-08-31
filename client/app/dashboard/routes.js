(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/index.html',
        controller: 'DashboardController',
        authenticate: true
      })
      .state('dashboard.verifyEmail', {
        url: '/verify/email',
        templateUrl: 'app/dashboard/verify/email.html',
        controller: 'DashboardVerifyEmailController',
        authenticate: true
      });

  }
})();
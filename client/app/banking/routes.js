(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    organizationResolve.$inject = ['Organizations', '$stateParams'];
    bankingResolve.$inject = ['Banks'];

    $stateProvider
      .state('banking', {
        url: '/organizations/:id/banking',
        templateUrl: 'app/banking/layout.html',
        abstract: true
      })
      .state('banking.index', {
        url: '',
        controller: 'BankingIndexController',
        templateUrl: '/app/banking/index.html',
        authenticate: true,
        resolve: {
          organization: organizationResolve,
          banking: bankingResolve
        }
      })
      .state('banking.setup', {
        url: '/setup',
        templateUrl: '/app/banking/setup/layout.html',
        controller: 'BankingSetupController',
        abstract: true
      })
      .state('banking.setup.start', {
        url: '',
        templateUrl: '/app/banking/setup/setup.html',
        authenticate: true
      })
      .state('banking.setup.identity', {
        url: '/identity',
        templateUrl: '/app/banking/setup/identity.html',
        authenticate: true
      });

    function organizationResolve(Organizations, $stateParams) {
      return Organizations.get({'id': $stateParams.id});
    }

    function bankingResolve(Banks) {
      return Banks.get();
    }
      
  }
})();
(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    $stateProvider
      .state('legal', {
        url: '/legal',
        templateUrl: 'app/legal/layout.html'
      })
      .state('legal.signatures', {
        url: '/signatures',
        templateUrl: 'app/legal/signatures.html'
      })
      .state('legal.tos', {
        url: '/tos',
        templateUrl: 'app/legal/tos.html'
      });

  }
})();
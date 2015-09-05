(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/layout.html',
        controller: 'MainController'
      })
      .state('main.public', {
        templateUrl: 'app/main/main.public.html'
      })
      .state('main.organization', {
        templateUrl: 'app/main/main.organization.html'
        //controller: 'MainController'
      });

  }
})();
(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    newFormResolve.$inject = ['Forms'];

    function newFormResolve(Forms) {
      return new Forms();
    }

    $stateProvider
      .state('forms', {
        url: '/forms',
        templateUrl: 'app/form/index.html',
        controller: 'FormsIndexController',
        authenticate: true
      })
      .state('newForm', {
        url: '/forms/new',
        templateUrl: 'app/form/new.html',
        controller: 'FormsNewController',
        authenticate: true,
        abstract: true,
        resolve: {
          form: newFormResolve
        }
      })
      .state('newForm.settings', {
        url: '/settings',
        templateUrl: 'app/form/new.settings.html',
        controller: 'FormsNewController',
        authenticate: true
      })
      .state('newForm.fields', {
        url: '/fields',
        templateUrl: 'app/form/new.fields.html',
        controller: 'FormsNewController',
        authenticate: true
      });
  }
})();
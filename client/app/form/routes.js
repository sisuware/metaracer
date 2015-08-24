(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    formsResolve.$inject = ['Forms','$stateParams'];
    newFormResolve.$inject = ['Forms'];
    organizationResolve.$inject = ['Organizations', '$stateParams'];

    function organizationResolve(Organizations, $stateParams) {
      return Organizations.get({'id': $stateParams.id});
    }

    function newFormResolve(Forms) {
      return new Forms();
    }

    function formsResolve(Forms, $stateParams) {
      return Forms.query({organization: $stateParams.id});
    }

    $stateProvider
      .state('forms', {
        url: '/organizations/:id/forms',
        templateUrl: 'app/form/index.html',
        controller: 'FormsIndexController',
        authenticate: true,
        resolve: {
          organization: organizationResolve,
          forms: formsResolve
        }
      })
      .state('newForm', {
        url: '/organizations/:id/forms/new',
        templateUrl: 'app/form/new.html',
        controller: 'FormsNewController',
        authenticate: true,
        abstract: true,
        resolve: {
          organization: organizationResolve,
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
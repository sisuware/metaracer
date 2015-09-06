(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    formsResolve.$inject = ['Forms','$stateParams'];
    formResolve.$inject = ['Forms','$stateParams'];
    newFormResolve.$inject = ['Forms'];
    organizationResolve.$inject = ['Organizations', '$stateParams'];

    function organizationResolve(Organizations, $stateParams) {
      return Organizations.get({'id': $stateParams.id});
    }

    function newFormResolve(Forms) {
      return new Forms();
    }

    function formsResolve(Forms, $stateParams) {
      return Forms.query({'_organization': $stateParams.id});
    }

    function formResolve(Forms, $stateParams) {
      return Forms.get({'id': $stateParams.form_id}); 
    }

    $stateProvider
      .state('forms', {
        url: '/organizations/:id/forms',
        templateUrl: 'app/form/layout.html',
        authenticate: true
        //abstract: true
      })
      .state('forms.list', {
        templateUrl: 'app/form/index.html',
        controller: 'FormsIndexController',
        authenticate: true,
        resolve: {
          organization: organizationResolve,
          forms: formsResolve
        }
      })
      .state('forms.show', {
        url: '/:form_id/show',
        templateUrl: 'app/form/show.html',
        controller: 'FormsShowController',
        authenticate: true,
        resolve: {
          form: formResolve
        }
      })
      .state('forms.edit', {
        url: '/edit/:form_id',
        templateUrl: 'app/form/edit.html',
        controller: 'FormsEditController',
        authenticate: true,
        resolve: {
          organization: organizationResolve,
          form: formResolve
        }
      })
      .state('forms.new', {
        url: '/new',
        templateUrl: 'app/form/new/layout.html',
        controller: 'FormsNewController',
        authenticate: true,
        resolve: {
          organization: organizationResolve,
          form: newFormResolve
        }
      })
      .state('forms.new.info', {
        url: '/info',
        templateUrl: 'app/form/new/info.html',
        authenticate: true
      })
      .state('forms.new.fields', {
        url: '/fields/:section',
        templateUrl: 'app/form/new/fields.html',
        authenticate: true
      });
  }
})();
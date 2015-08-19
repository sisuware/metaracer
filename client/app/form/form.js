'use strict';

angular.module('metaracerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('form', {
        url: '/form',
        templateUrl: 'app/form/form.html',
        controller: 'FormCtrl',
        authenticate: true
      })
      .state('newForm', {
        url: '/form/new',
        templateUrl: 'app/form/new.html',
        controller: 'FormNewCtrl',
        authenticate: true
      });
  });
(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .config(metaracerAppConfig);

  metaracerAppConfig.$inject = ['$stateProvider'];

  function metaracerAppConfig($stateProvider) {
    $stateProvider
      .state('auth', {
        templateUrl: 'app/account/auth.layout.html'
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('auth.signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  }
})();
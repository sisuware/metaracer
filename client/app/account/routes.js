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
        controller: 'SignupController'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'app/account/settings/password.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('confirm', {
        url:'/confirm',
        templateUrl: 'app/account/confirm/layout.html',
        controller: 'ConfirmController',
        authenticate: true
      })
      .state('confirm.email', {
        url: '/email',
        templateUrl: 'app/account/confirm/email.html',
        controller: 'ConfirmEmailController',
        authenticate: true
      })
      .state('verify', {
        url: '/verify',
        templateUrl: 'app/account/verify/layout.html',
        controller: 'VerifyController',
        authenticate: true
      })
      .state('verify.email', {
        url: '/email',
        templateUrl: 'app/account/verify/email.html',
        authenticate: true
      });
  }
})();
'use strict';

var modules = [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'fg'
];

angular
  .module('metaracerApp', modules)
  .factory('authInterceptor', authInterceptor)
  .config(metaracerAppConfig)
  .run(metaracerAppRun);

metaracerAppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];
metaracerAppRun.$inject = ['$rootScope', '$location', 'Auth'];
authInterceptor.$inject = ['$q', '$cookieStore', '$location'];

function metaracerAppConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authInterceptor');
}
  
function metaracerAppRun($rootScope, $location, Auth) {
  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function (event, next) {
    Auth.isLoggedInAsync(function(loggedIn) {
      if (next.authenticate && !loggedIn) {
        event.preventDefault();
        $location.path('/login');
      }
    });
  });
}

function authInterceptor($q, $cookieStore, $location) {
  var service = {
    request: request,
    responseError: responseError
  };

  return service;
  
  // Add authorization token to headers
  function request(config) {
    config.headers = config.headers || {};
    if ($cookieStore.get('token')) {
      config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
    }
    return config;
  }

  // Intercept 401s and redirect you to login
  function responseError(response) {
    if(response.status === 401) {
      $location.path('/login');
      // remove any stale tokens
      $cookieStore.remove('token');
      return $q.reject(response);
    } else {
      return $q.reject(response);
    }
  }
}
(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .factory('AuthResource',  AuthResource);
  
  AuthResource.$inject = ['$resource'];

  function AuthResource($resource) {
    var url = '/auth/local';

    return $resource(url);
  } 
})();
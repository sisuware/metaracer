(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .factory('Banks', BanksResource);

  BanksResource.$inject = ['$resource'];

  function BanksResource($resource) {
    var url = '/api/banks/:id';

    return $resource(url, {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
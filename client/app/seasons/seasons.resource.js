(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .factory('Seasons', SeasonsResource);

  SeasonsResource.$inject = ['$resource'];

  function SeasonsResource($resource) {
    var url = '/api/seasons/:id';

    return $resource(url, {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      years: {
        isArray: true,
        params: {
          id: 'years'
        }
      }
    });
  }

})();
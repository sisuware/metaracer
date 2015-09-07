(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .factory('Forms', FormsResource);

  FormsResource.$inject = ['$resource'];

  function FormsResource($resource) {
    var url = '/api/forms/:id';

    return $resource(url, {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

})();
(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .factory('Members', MembersResource);

  MembersResource.$inject = ['$resource'];

  function MembersResource($resource) {
    var url = '/api/members/:id';

    return $resource(url, {
      id: '@_id'
    });
  }

})();
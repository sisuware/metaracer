(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .factory('Organizations', OrganizationsResource);

  OrganizationsResource.$inject = ['$resource'];

  function OrganizationsResource($resource) {
    var url = '/api/organizations/:id';

    return $resource(url, {
      id: '@_id'
    });
  }

})();
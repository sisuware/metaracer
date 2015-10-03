'use strict';

angular
  .module('metaracerApp')
  .factory('UserResource', UserResource);

UserResource.$inject = ['$resource'];

function UserResource($resource) {
  var url = '/api/users/:id/:controller';

  return $resource(url, {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    },
    verifyEmail: {
      method: 'PUT',
      params: {
        controller: 'verifyEmail'
      }
    },
    membership: {
      method: 'GET',
      params: {
        controller: 'membership'
      }
    }
  });
}

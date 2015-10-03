'use strict';

angular
  .module('metaracerApp')
  .factory('Auth', Auth);

Auth.$inject = ['UserResource', '$cookieStore', '$q', 'AuthResource'];

function Auth(UserResource, $cookieStore, $q, AuthResource) {
  var currentUser = {};
  var tokenId = 'token';
  
  if($cookieStore.get(tokenId)) {
    currentUser = UserResource.get();
  }

  var service = {
    login: login,
    logout: logout,
    createUser: createUser,
    changePassword: changePassword,
    verifyEmail: verifyEmail,
    getCurrentUser: getCurrentUser,
    isLoggedIn: isLoggedIn,
    isLoggedInAsync: isLoggedInAsync,
    isAdmin: isAdmin,
    getToken: getToken,
    membership: membership
  };

  return service;

  /**
   * Authenticate user and save token
   *
   * @param  {Object}   user     - login info
   * @return {Promise}
   */
  function login(user) {
    var dfr = $q.defer();
    var auth = new AuthResource({
      email: user.email,
      password: user.password
    });

    auth.$save().then(_authSuccess.bind(null, dfr), _authFailure.bind(null, dfr));

    return dfr.promise;
  }

  /**
   * Delete access token and user info
   *
   * @param  {Function}
   */
  function logout() {
    $cookieStore.remove(tokenId);
    currentUser = {};
  }

  /**
   * Create a new user
   *
   * @param  {Object}   user     - user info
   * @return {Promise}
   */
  function createUser(user) {
    var dfr = $q.defer();
    var user = new UserResource(user);

    user.$save().then(_authSuccess.bind(null, dfr), _authFailure.bind(null, dfr));

    return dfr.promise;
  }

  /**
   * Change password
   *
   * @param  {String}   oldPassword
   * @param  {String}   newPassword
   * @param  {Function} callback    - optional
   * @return {Promise}
   */
  function changePassword(oldPassword, newPassword, callback) {
    var cb = callback || angular.noop;

    return UserResource.changePassword({ id: currentUser._id }, {
      oldPassword: oldPassword,
      newPassword: newPassword
    }, function(user) {
      return cb(user);
    }, function(err) {
      return cb(err);
    }).$promise;
  }

  function verifyEmail(hash) {
    return UserResource.verifyEmail({id: currentUser._id },{'hash': hash});
  }

  function membership(id) {
    return UserResource.membership({'organization': id});
  }

  /**
   * Gets all available info on authenticated user
   *
   * @return {Object} user
   */
  function getCurrentUser() {
    return currentUser;
  }

  /**
   * Check if a user is logged in
   *
   * @return {Boolean}
   */
  function isLoggedIn() {
    return currentUser.hasOwnProperty('role');
  }

  /**
   * Waits for currentUser to resolve before checking if user is logged in
   */
  function isLoggedInAsync(cb) {
    if(currentUser.hasOwnProperty('$promise')) {
      currentUser.$promise.then(function() {
        cb(true);
      }).catch(function() {
        cb(false);
      });
    } else if(currentUser.hasOwnProperty('role')) {
      cb(true);
    } else {
      cb(false);
    }
  }

  /**
   * Check if a user is an admin
   *
   * @return {Boolean}
   */
  function isAdmin() {
    return currentUser.role === 'admin';
  }

  /**
   * Get auth token
   */
  function getToken() {
    return $cookieStore.get(tokenId);
  }

  function _authSuccess(dfr, data) {
    $cookieStore.put(tokenId, data.token);
    currentUser = UserResource.get();
    dfr.resolve(data);
  }

  function _authFailure(dfr, error) {
    logout();
    dfr.reject(error);
  }
}

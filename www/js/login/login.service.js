(function () {
  'use strict';

  angular
  .module('MGMNTDASHBOARD.login').service('authService', authService);
authService.$inject = ['$rootScope', '$http', 'HTTP_URL_CONSTANTS', 'STRING_CONSTANTS'];
function authService($rootScope, $http, HTTP_URL_CONSTANTS, STRING_CONSTANTS) {
  var authServices = this;
  authServices.processLogin = processLoginResponse;

  function processLoginResponse(reqData) {
    var url = 'http://35.200.229.149:9000/login?userName=' + reqData.username + '&password=' + reqData.password;

    return $http({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }

    });
  }

  return authServices;
}
})();

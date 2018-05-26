(function () {
  'use strict';
  angular.module('MGMNTDASHBOARD.settings').service('SettingService', SettingService);
  SettingService.$inject = ['$rootScope', '$http', 'HTTP_URL_CONSTANTS', 'STRING_CONSTANTS'];
  function SettingService($rootScope, $http, HTTP_URL_CONSTANTS, STRING_CONSTANTS) {
    var settingService = this;
    settingService.updateBulletien = callUpdateBulletien;
      
    function callUpdateBulletien(reqData) {
      return $http({
        method: 'POST',
        //url: 'http://35.200.229.149:9000/' + HTTP_URL_CONSTANTS.UPDATE_BULLETIEN + '?content=' + reqData,
        url: STRING_CONSTANTS.LOCAL_SERVER_IP + HTTP_URL_CONSTANTS.UPDATE_BULLETIEN + '?content=' + reqData,
        data: reqData,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
      
    return settingService;
  }
})();


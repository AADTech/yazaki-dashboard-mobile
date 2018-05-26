(function () {
  'use strict';

  angular
  .module('MGMNTDASHBOARD.dashboard').service('dashboardService', dashboardService);
dashboardService.$inject = ['$rootScope', '$http', 'HTTP_URL_CONSTANTS', 'STRING_CONSTANTS'];
function dashboardService($rootScope, $http, HTTP_URL_CONSTANTS, STRING_CONSTANTS) {
  var dashboardService = this;
  dashboardService.processIOinfoDetailsDaily = processInfoDetailsDaily;
  dashboardService.processIOinfoDetailsMonthly = processInfoDetailsMonthly;
  dashboardService.processIOinfoDetailsYearly = processInfoDetailsYearly;
    
  function processInfoDetailsDaily(reqData) {
    //var url = 'http://35.200.229.149:9000/getSalesIODailyInfo?plantId=1&key=' + reqData.key + '&year=' + reqData.year + '&month=' + reqData.month;
    var url = STRING_CONSTANTS.LOCAL_SERVER_IP + 'getSalesIODailyInfo?plantId=1&key=' + reqData.key + '&year=' + reqData.year + '&month=' + reqData.month;

    return $http({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }

    });
  } 
    
  function processInfoDetailsMonthly(reqData) {
    //var url = 'http://35.200.229.149:9000/getSalesIOInfo?plantId=1&key=' + reqData.key + '&type=MTD&year=' + reqData.year;
    var url = STRING_CONSTANTS.LOCAL_SERVER_IP + 'getSalesIOInfo?plantId=1&key=' + reqData.key + '&type=MTD&year=' + reqData.year;

    return $http({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }

    });
  }
    
  function processInfoDetailsYearly(reqData) {
    //var url = 'http://35.200.229.149:9000/getSalesIOInfo?plantId=1&key=' + reqData.key + '&type=YTD&year=' + reqData.year;
    var url = STRING_CONSTANTS.LOCAL_SERVER_IP + 'getSalesIOInfo?plantId=1&key=' + reqData.key + '&type=YTD&year=' + reqData.year;

    return $http({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }

    });
  }

  return dashboardService;
}
})();

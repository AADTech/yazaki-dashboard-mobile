(function () {
  'use strict';
  angular.module('MGMNTDASHBOARD').
  constant('Roster_MetaData', {
    'CONTRACT': 'CONTRACT',
    'REPORTING_MANAGER': 'REPORTING_MANAGER',
    'EMPLOYEE_ROLE': 'EMPLOYEE_ROLE',
    'ORG_UNIT': 'ORG_UNIT',
    'CAPABILITY': 'CAPABILITY',
    'EM_LEVEL': 'EM_LEVEL',
    'ROSTER_SHORE': 'ROSTER_SHORE',
    'LOCATION': 'LOCATION',
    'CITIZENSHIP': 'CITIZENSHIP',
    'VISA_COUNTRY': 'VISA_COUNTRY',
    'VISA_TYPE': 'VISA_TYPE',
    'HOME_OFFICE': 'HOME_OFFICE',
    'CERTIFICATIONS': 'CERTIFICATIONS'
  }).
  constant('HTTP_URL_CONSTANTS', {
    'UPDATE_BULLETIEN': '/updateBulletin',
    'AUTH_LINK': '/login.json',
    'ROSTER_LINK': '/roster.json',
    'EMPLOYEE_LINK': '/employee.json',
    'NEWS_LINK': '/news.json',
    'EVENTS_LINK': '/event.json',
    'METADATA_LINK': '/metadata.json',
    'UPDATE_ROSTER_LINK': '/employee.json'
  }).
  constant('STRING_CONSTANTS', {
    'SERVER_IP': '35.200.229.149:9000/accmgmt/api',
    'LOCAL_SERVER_IP': 'http://35.200.229.149:9000/',
    'ROSTER_SERVER_IP': '35.200.229.149:9000/accmgmt/api/ionic'
  }).
  constant('CALENDAR_CONSTANTS', {
    'MONTH': ["JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"],
    'YEAR': ["2015","2016","2017","2018"],
  });

})();
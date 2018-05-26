/**
 * Created by mohankm on 2/5/2017.
 */

(function () {
  'use strict';

  angular.module('MGMNTDASHBOARD.login')
    .config(config);

  config.$inject = ['$stateProvider'];
  /* @ngInject */
  function config($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: "LoginController",
        controllerAs: "loginCtrl"
      });
  }
})();

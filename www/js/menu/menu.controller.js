/**
 * Created by mohankm on 2/18/2017.
 */
(function () {
  'use strict';
  angular
    .module('MGMNTDASHBOARD')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$scope', '$rootScope', '$location', '$window', '$timeout', '$ionicHistory'];
  /* @ngInject */
  function MenuController($scope, $rootScope, $location, $window, $timeout, $ionicHistory) {
    var menuCtrl = this;
    menuCtrl.profileDetails =  $rootScope.loginResponse;
    menuCtrl.logout = logout;

 function logout() {
      $timeout(function () {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        $window.localStorage['auth-token'] = undefined;
        $location.path('/login');
      }, 30);
}
    // function logout() {

    //    $window.localStorage.clear();
    //   $window.localStorage['auth-token'] = undefined;
    //   /*$rootScope.authToken=undefined;*/
    //    var cookies = document.cookie.split(";");

    // for (var i = 0; i < cookies.length; i++) {
    //     var cookie = cookies[i];
    //     var eqPos = cookie.indexOf("=");
    //     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // }

    //   $location.path('/login');

    // }
  }
})();

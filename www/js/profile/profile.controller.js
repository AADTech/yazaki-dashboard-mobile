/**
 * Created by Abdullah on 3/22/2018.
 */
(function () {
  'use strict';
  angular
    .module('MGMNTDASHBOARD.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', '$rootScope', '$location', '$window', '$timeout', '$ionicHistory'];
  /* @ngInject */
  function ProfileController($scope, $rootScope, $location, $window, $timeout, $ionicHistory) {
   var profileCtrl = this;
   profileCtrl.profileDetails =  $rootScope.loginResponse.user;
   profileCtrl.profileUpdate = function(data){
       console.log(data);
   }
   
  }
})();

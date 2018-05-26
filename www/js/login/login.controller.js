/**
 * Created by mohankm on 2/5/2017.
 */
(function () {
    'use strict';
    angular
        .module('MGMNTDASHBOARD.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', 'authService', '$ionicPopup', '$rootScope', '$window', '$state'];
    /* @ngInject */
    function LoginController($scope, $location, authService, $ionicPopup, $rootScope, $window, $state) {
        var loginCtrl = this;
        loginCtrl.loginClick = loginClick;
        loginCtrl.showLoadingFlg = false;
        loginCtrl.loginResponse;
        loginCtrl.rosterListItems;
        loginCtrl.showPasswordIsChecked = false;
        loginCtrl.showPassword = showPassword;
        loginCtrl.rememberMe = false;
        $rootScope.showLoading = false;

        function init() {

            if ($window.localStorage['userName']) {
                loginCtrl.userName = $window.localStorage['userName'];
            }

            if ($window.localStorage['password']) {
                loginCtrl.password = $window.localStorage['password'];
            }

            if ($window.localStorage['auth-token']) {
                $rootScope.authToken = $window.localStorage['auth-token'];
                loginClick();
            }
        }

        function loginClick() {
            //$location.path('/menu/dashboard');        
            if (loginCtrl.userName && loginCtrl.password) {
                var requestObject = {
                    'username': loginCtrl.userName,
                    'password': loginCtrl.password,
                    'mobileUser': true
                };
                authService.processLogin(requestObject).success(function (response, status, headers, config) {
                    $rootScope.loginResponse = response;

                    $rootScope.fullName = response.user.firstName + ' ' + response.user.lastName;
                    $rootScope.authToken = headers('auth-token');
                    $window.localStorage['auth-token'] = headers('auth-token');
                    $window.localStorage['userName'] = requestObject.username;
                    if (loginCtrl.rememberMe) {
                        $window.localStorage['userName'] = requestObject.username;
                        $window.localStorage['password'] = requestObject.password;
                    }
                    $location.path('/menu/dashboard');
                }).error(function (response, status, headers, config) {
                    loginCtrl.showErrorAlert(response);
                });
            } else {
                loginCtrl.showErrorAlert('Please enter your UserName and Password!.');
            }
        }


        function showPassword() {
            if (loginCtrl.showPasswordIsChecked) {
                loginCtrl.showPasswordIsChecked = false;
            } else {
                loginCtrl.showPasswordIsChecked = true;
            }
        }

        loginCtrl.showErrorAlert = function (errMessage) {
            if (errMessage) {
                errMessage = JSON.stringify(errMessage);
            }
            $ionicPopup.alert({
                title: 'Error Login!',
                template: errMessage
            });
        };



    }
})();

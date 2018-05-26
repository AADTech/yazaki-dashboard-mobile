/**
 * Created by mohankm on 2/18/2017.
 */
(function () {
    'use strict';
    angular
        .module('MGMNTDASHBOARD.settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope', '$rootScope', '$location', '$window', '$timeout', 'CALENDAR_CONSTANTS', 'SettingService', '$ionicHistory'];
    /* @ngInject */
    function SettingsController($scope, $rootScope, $location, $window, $timeout, CALENDAR_CONSTANTS, SettingService, $ionicHistory) {
        var settingsCtrl = this;
        settingsCtrl.profileDetails = $rootScope.loginResponse;
        settingsCtrl.monthArray = CALENDAR_CONSTANTS.MONTH;
        settingsCtrl.yearArray = CALENDAR_CONSTANTS.YEAR;
        settingsCtrl.profileUpdate = function (data) {
            SettingService.updateBulletien(data.bulletin).success(function (response, status, headers, config) {
                console.log(response);
                //settingsCtrl.showErrorAlert(response);
            }).error(function (response, status, headers, config) {
                settingsCtrl.showErrorAlert(response);
            });
        }

    }
})();

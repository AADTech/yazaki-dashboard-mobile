/**
 * Created by mohankm on 2/6/2017.
 */
(function () {
    'use strict';

    angular.module('MGMNTDASHBOARD')
        .config(config);

    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state('menu', {
                url: '/menu',
                templateUrl: 'js/menu/menu.html',
                controller: "MenuController",
                controllerAs: "menuCtrl"
            })
            .state('menu.dashboard', {
                url: '/dashboard',
                views: {
                    'side-menu21': {
                        templateUrl: 'js/dashboard/dashboard.html',
                        controller: 'DashboardController',
                        controllerAs: 'dashboardCtrl'
                    }
                }
            })
            .state('menu.salesReportDetails', {
                url: '/salesReportDetails',
                views: {
                    'side-menu21': {
                        templateUrl: 'js/details/salesReportDetails.html',
                        controller: 'DashboardController',
                        controllerAs: 'dashboardCtrl'
                    }
                }
            })
            .state('menu.ioReportDetails', {
                url: '/ioReportDetails',
                views: {
                    'side-menu21': {
                        templateUrl: 'js/details/ioReportDetails.html',
                        controller: 'DashboardController',
                        controllerAs: 'dashboardCtrl'
                    }
                }
            })
            .state('menu.settings', {
                url: '/settings',
                views: {
                    'side-menu21': {
                        templateUrl: 'js/settings/settings.html',
                        controller: 'SettingsController',
                        controllerAs: 'settingsCtrl'
                    } 
                }
            })
            .state('menu.profile', {
                url: '/profile',
                views: {
                    'side-menu21': {
                        templateUrl: 'js/profile/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'profileCtrl'
                    } 
                }
            })
    }
})();

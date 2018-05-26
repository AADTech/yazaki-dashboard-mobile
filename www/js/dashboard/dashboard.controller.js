(function () {
  'use strict';
  angular
    .module('MGMNTDASHBOARD.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$rootScope','$ionicPopup','$window', '$location', 'dashboardService', '$state', '$ionicHistory','CALENDAR_CONSTANTS','$timeout' ];
  /* @ngInject */
  function DashboardController($scope, $rootScope, $ionicPopup, $window, $location, dashboardService, $state, $ionicHistory, CALENDAR_CONSTANTS, $timeout) {
    var homeCtrl = this;
    
    $scope.$on("$ionicView.enter", function () {
       $ionicHistory.clearCache();
       $ionicHistory.clearHistory();
    });
      
    homeCtrl.loginResponse = $rootScope.loginResponse;
    $scope.monthArray = CALENDAR_CONSTANTS.MONTH;
    $scope.yearArray = CALENDAR_CONSTANTS.YEAR;
      
    $scope.viewYearlyIoInfo ="Graph";
    $scope.viewMonthlyIoInfo ="Graph";
    $scope.viewDailyIoInfo ="Graph";
      
    $scope.viewYearlySalesInfo ="Graph";
    $scope.viewMonthlySalesInfo ="Graph";  
    $scope.viewDailySalesInfo ="Graph";
      
    homeCtrl.stackTable = $rootScope.loginResponse.supplierRatingPlanned; 
    homeCtrl.stackTable.forEach(function(entry,key) {
        var dateFormat = entry.month + "/" + entry.year
        Object.assign(entry, {date: dateFormat});
    });
    $scope.stackGraphData = homeCtrl.stackTable;
    $scope.barGraphData = homeCtrl.loginResponse.ioInfo; 
    $scope.salesInfoBarGraphData = homeCtrl.loginResponse.salesInfo;
    $scope.bulletin = homeCtrl.loginResponse.bulletin;
    $scope.plants = homeCtrl.loginResponse.plants;
    $scope.ioYear =  homeCtrl.loginResponse.supplierRatingPlanned[0].year.toString();
    $scope.salesYear =  homeCtrl.loginResponse.supplierRatingPlanned[0].year.toString();
    $scope.ioMonth =  $scope.monthArray[homeCtrl.loginResponse.supplierRatingPlanned[0].month];
    $scope.salesMonth =  $scope.monthArray[homeCtrl.loginResponse.supplierRatingPlanned[0].month];
      
    $scope.showIoDetails = function(){
        $location.path('/menu/ioReportDetails');
    }
    $scope.showSalesDetails = function(){
        $location.path('/menu/salesReportDetails');
    }
    
    $scope.img_one = "brand_logo";
    $scope.changeBrand = function(cssName){
        if(cssName == 'img_one'){
           $scope.img_one = "brand_logo";
           $scope.img_two = null;
           $scope.img_three = null;
        }else if(cssName == 'img_two'){
           $scope.img_two = "brand_logo";
           $scope.img_one = null;
           $scope.img_three = null;
        }else if(cssName == 'img_three'){
           $scope.img_three = "brand_logo";
           $scope.img_one = null;
           $scope.img_two = null;
        }
        
    }  
    
 /*******************************      IO Service starts *******************************/   
    
    $scope.DailyIoYearChnaged = function(data,key,id,ioMonth){
          var requestObject = {
              'month': $scope.monthArray.indexOf(ioMonth),
              'year': data,
              'key':key
          };
          dashboardService.processIOinfoDetailsDaily(requestObject).success(function (response, status, headers, config) {
              if(response.length == 0){
                 $scope.barGraphData = [];
              }else{
                $scope.barGraphData = response;
                $scope.$broadcast('eventName', response,id)        
              }
        }).error(function (response, status, headers, config) {
          //loginCtrl.showErrorAlert(response);
        });
    }
    
    
    $scope.DailyIoMonthChnaged = function(data,key,id,ioYear){
        var requestObject = {
              'month': $scope.monthArray.indexOf(data) + 1,
              'year': ioYear,
              'key':key
          };
          dashboardService.processIOinfoDetailsDaily(requestObject).success(function (response, status, headers, config) {     
          if(response.length == 0){
             $scope.salesInfoBarGraphData = [];
          }else{
            $scope.salesInfoBarGraphData = response;  
            $scope.$broadcast('eventName', response,id)        
          }    
        }).error(function (response, status, headers, config) {
          //loginCtrl.showErrorAlert(response);
        });
    }
    
     $scope.MonthlyIoMonthChnaged = function(year,key){
        var requestObject = {
              'year': year,
              'key':key
        };
        dashboardService.processIOinfoDetailsMonthly(requestObject).success(function (response, status, headers, config) {     
          if(response.length == 0){
             $scope.groupBarGraphDataMonthly = [];
          }else{
            $scope.groupBarGraphDataMonthly = response;
            $scope.$broadcast('eventName', response,id)        
          }
        }).error(function (response, status, headers, config) {
          //loginCtrl.showErrorAlert(response);
        });
     }
     $scope.MonthlyIoMonthChnaged('2018','I/O');     
      
      
     $scope.YearlyIoMonthChnaged = function(year,key){
        var requestObject = {
              'year': year,
              'key':key
        };
        dashboardService.processIOinfoDetailsYearly(requestObject).success(function (response, status, headers, config) {
          if(response.length == 0){
             $scope.groupBarGraphDataYearly = [];
          }else{
            $scope.groupBarGraphDataYearly = response;
            //$scope.$broadcast('eventName', response,id)        
          }
        }).error(function (response, status, headers, config) {
          //loginCtrl.showErrorAlert(response);
        });
     }
     $scope.YearlyIoMonthChnaged('2018','I/O');
      
/*******************************      IO Service end       *******************************/
      
/*******************************      SALES Service starts *******************************/

    $scope.DailySalesYearChnaged = function(data,key,id,salesMonth){
          var requestObject = {
              'month': $scope.monthArray.indexOf(salesMonth),
              'year': data,
              'key':key
          };
          dashboardService.processIOinfoDetailsDaily(requestObject).success(function (response, status, headers, config) {
              if(response.length == 0){
                 $scope.salesInfoBarGraphData = [];
              }else{
                $scope.salesInfoBarGraphData = response;
                $scope.$broadcast('eventName', response,id)        
              }
        }).error(function (response, status, headers, config) {
          //loginCtrl.showErrorAlert(response);
        });
    }
    
    
    $scope.DailySalesMonthChnaged = function(data,key,id, salesYear){
        var requestObject = {
              'month': $scope.monthArray.indexOf(data) + 1,
              'year': salesYear,
              'key':key
          };
          dashboardService.processIOinfoDetailsDaily(requestObject).success(function (response, status, headers, config) {     
          if(response.length == 0){
             $scope.groupBarGraphSalesDataMonthly = [];
          }else{
            $scope.groupBarGraphSalesDataMonthly = response;  
            $scope.$broadcast('eventName', response, id)        
          }      
        }).error(function (response, status, headers, config) {
          //loginCtrl.showErrorAlert(response);
        });
    }
    
    $scope.MonthlySalesMonthChnaged = function(year,key){
        var requestObject = {
              'year': year,
              'key':key
        };
        dashboardService.processIOinfoDetailsMonthly(requestObject).success(function (response, status, headers, config) {     
            if(response.length == 0){
                 $scope.groupBarGraphSalesDataMonthly = [];
              }else{
                $scope.groupBarGraphSalesDataMonthly = response;
                $scope.$broadcast('eventName', response, id)        
              }
        }).error(function (response, status, headers, config) {
          //loginCtrl.showErrorAlert(response);
        });
     }
     $scope.MonthlySalesMonthChnaged('2018','SALES');
      
     $scope.YearlySalesMonthChnaged = function(year,key){
        var requestObject = {
              'year': year,
              'key':key
        };
        dashboardService.processIOinfoDetailsYearly(requestObject).success(function (response, status, headers, config) {     
         //$scope.groupBarGraphSalesDataYearly = response;
         if(response.length == 0){
             $scope.groupBarGraphSalesDataYearly = [];
          }else{
            $scope.groupBarGraphSalesDataYearly = response;
            //$scope.$broadcast('eventName', response,id)        
          }
        }).error(function (response, status, headers, config) {
          //loginCtrl.showErrorAlert(response);
        });
     }
     $scope.YearlySalesMonthChnaged('2018','SALES'); 
/*******************************      SALES Service end    *******************************/
    
  }
})();
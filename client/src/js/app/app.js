 (function () {
   'use strict';
   angular.module('ideaBox', [
     'customFilters',
     'ui.router'
   ])
     .config(RouterConfig);


   function RouterConfig($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.otherwise('/');

     $stateProvider

     // HOME STATES AND NESTED VIEWS ========================================
     .state('list', {
       url: '/',
       templateUrl: 'app/home/views/ideaList.html',
       controller: 'ideasListCtrl'
     })
     
     .state('list.ideaDetails', {
       url: '/ideaDetails/:Id',
       templateUrl: 'app/home/views/ideaDetails.html',
       controller: 'ideaDetailsCtrl'
     })

     .state('createIdea', {
       url: '/createIdea',
       templateUrl: 'app/home/views/createIdea.html'
     });

   }


 }());

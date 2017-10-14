import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('home', {
      url: '/home',
      component: 'home',
      resolve: {
        cats: function(dataService) {
          "ngInject";
          return dataService.getCategories();
        }
      }
    });
})

.component('home', homeComponent)

.name;

export default homeModule;

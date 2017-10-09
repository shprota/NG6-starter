import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import uiRouter from '@uirouter/angularjs';
import hotelsComponent from './hotels.component';
import hotelsService from './hotels.service';
import 'jquery';
import 'niceScroll';
import 'ngNiceScroll';
import 'ngMap';

let hotelsModule = angular.module('hotels', [
  uiRouter,
  ngSanitize,
  'angular-nicescroll',
  'ngMap'
])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('hotels', {
      url: '/hotels',
      component: 'hotels'
  });
})

.component('hotels', hotelsComponent)
.service('hotelsService', hotelsService)

.name;

export default hotelsModule;

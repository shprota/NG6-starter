import angular from 'angular';
import ngAnimate from 'angular-animate';
import uiRouter from '@uirouter/angularjs';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import ngSanitize from 'angular-sanitize';
import ngMap from 'ngmap';
//import 'normalize.css';

angular.module('app', [
    uiRouter,
    Common,
    Components,
    ngSanitize,
    ngMap,
    ngAnimate,
  ])
  .config(($locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .run(($transitions, dataService) => {
    "ngInject";
    dataService.getCategories();
    $transitions.onStart({}, trans => {
      trans.promise.catch(e => {
        trans.router.stateService.go('language');
      });
    });
  })
  .constant('wpUrl', 'http://gn.shprota.com')
  .constant('mapsUrl', 'https://maps.google.com/maps/api/js?key=AIzaSyDHVHOiHjXhgl8Zz3GTwkZVgm8HCNRG3fc')
  .constant('homeCats', {
    news: 66,
    hotels: 13,
    holiday: 199,
    enjoying: 176,
    surroundings: 77
  })
  .component('app', AppComponent);

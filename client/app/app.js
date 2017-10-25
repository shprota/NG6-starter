import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import uiRouter from '@uirouter/angularjs';
import ngMap from 'ngmap';
import 'angular-gettext/dist/angular-gettext';
import 'angular-imagesloaded/dist/angular-imagesloaded';
//import 'angular-lazy-img/dist/angular-lazy-img';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import ngSanitize from 'angular-sanitize';
//import 'normalize.css';
import tts from './common/tts';

angular.module('app', [
    uiRouter,
    Common,
    Components,
    ngSanitize,
    ngMap,
    ngAnimate,
    tts,
    'gettext',
    'bc.imagesloaded',
    //'angularLazyImg',
    ngTouch,
  ])
  .config(($locationProvider/*, lazyImgConfigProvider*/) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
/*
    lazyImgConfigProvider.setOptions({
      onSuccess: function(img) {
        let el = $(img.$elem.get(0)).parents('.nicescroll');
        if (el.length && el.getNiceScroll(0)) {
          el.getNiceScroll(0).resize();
        }
      }
    });
*/
  })
  .run(($transitions) => {
    "ngInject";
    $transitions.onStart({}, trans => {
      trans.promise.catch(e => {
        trans.router.stateService.go('language');
      });
    });
  })
  .constant('wpUrl', 'http://gonetanya.com')
  .constant('mapsUrl', 'https://maps.google.com/maps/api/js?key=AIzaSyDHVHOiHjXhgl8Zz3GTwkZVgm8HCNRG3fc')
  .constant('homeCats', {
    news: 66,
    hotels: 13,
    holiday: 199,
    enjoying: 176,
    surroundings: 77
  })
  .component('app', AppComponent);

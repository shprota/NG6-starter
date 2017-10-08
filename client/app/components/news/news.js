import angular from 'angular';
//import niceScroll from 'niceScroll';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import newsComponent from './news.component';
import newsService from './news.service';
require('jquery');
require('niceScroll');
require('ngNiceScroll');

let newsModule = angular.module('news', [
  uiRouter,
  ngSanitize,
  'angular-nicescroll',
])

  .config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('news', {
      url: '/news',
      component: 'news'
    });
})

.component('news', newsComponent)
.service('newsService', newsService)

.name;

export default newsModule;

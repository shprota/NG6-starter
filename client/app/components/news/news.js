import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import uiRouter from '@uirouter/angularjs';
import newsComponent from './news.component';
import newsService from './news.service';
import 'jquery';
import 'niceScroll';
import 'ngNiceScroll';

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

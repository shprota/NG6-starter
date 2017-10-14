import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import contactComponent from './contact.component';

let contactModule = angular.module('contact', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('contact', {
      url: '/contact',
      component: 'contact'
  });
})

.component('contact', contactComponent)

.name;

export default contactModule;

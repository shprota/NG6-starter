import angular from 'angular';
import service from './expire.service';
import directive from './expire.directive';

let expireModule = angular.module('expireModule', [])
.directive('expirePopup', directive)
.service('expireService', service)
.name;

export default expireModule;

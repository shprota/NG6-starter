import angular from 'angular';
import Service from './expire.service';

let expireModule = angular.module('expireModule', [])

.service('expireService', Service)

.name;

export default expireModule;

import angular from 'angular';
import Service from './service';

let dataModule = angular.module('dataModule', [])

.service('dataService', Service)

.name;

export default dataModule;

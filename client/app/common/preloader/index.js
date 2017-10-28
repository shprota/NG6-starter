import angular from 'angular';
import directive from './preloader.directive';
import './preloader.scss';

let preloaderModule = angular.module('preloaderModule', [])

.directive('preloader', directive)

.name;

export default preloaderModule;

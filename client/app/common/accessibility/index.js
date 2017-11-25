import angular from 'angular';
import directive from './accessibility.directive';
import service from './accessibility.service';
let accessibilityModule = angular.module('accessibilityModule', [])

.directive('abMenu', directive)
.service('abService', service)
.name;

export default accessibilityModule;

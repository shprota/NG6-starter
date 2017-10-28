import angular from 'angular';
import NavigationDirective from './navigation.directive';
import NavItemDirective from './navitem.directive';

let navigationModule = angular.module('navigation', [])
.directive('keyNav', NavigationDirective)
.directive('navItem', NavItemDirective)
.name;

export default navigationModule;




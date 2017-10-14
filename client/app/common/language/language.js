import angular from 'angular';
import LanguageFactory from './language.factory';
import LanguageDirective from './language.directive';

let languageModule = angular.module('languageService', [])

.service('languageFactory', LanguageFactory)
.directive('maybeRtl', LanguageDirective)

.name;

export default languageModule;

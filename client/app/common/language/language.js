import angular from 'angular';
import LanguageFactory from './language.factory';

let languageModule = angular.module('languageService', [])

.service('languageFactory', LanguageFactory)

.name;

export default languageModule;

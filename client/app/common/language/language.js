import angular from 'angular';
import LanguageFactory from './language.factory';
import LanguageDirective from './language.directive';
import ru from '../po/ru.po';
import fr from '../po/fr.po';

let languageModule = angular.module('languageService', [])
.run((gettextCatalog) => {
  "ngInject";
  gettextCatalog.setStrings('ru', ru.ru);
  gettextCatalog.setStrings('fr', fr.fr);
})
.service('languageFactory', LanguageFactory)
.directive('maybeRtl', LanguageDirective)

.name;

export default languageModule;

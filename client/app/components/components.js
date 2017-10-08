import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Language from './language/language';
import News from './news/news';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Language,
  News,
])

.name;

export default componentModule;

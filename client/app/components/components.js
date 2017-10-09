import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Language from './language/language';
import News from './news/news';
import Hotels from './hotels/hotels';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Language,
  News,
  Hotels,
])

.name;

export default componentModule;

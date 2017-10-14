import angular from 'angular';
import Home from './home/home';
import Language from './language/language';
import Contact from './contact/contact';
import Posts from './posts/posts';

let componentModule = angular.module('app.components', [
  Language,
  Home,
  Contact,
  Posts,
])

.name;

export default componentModule;

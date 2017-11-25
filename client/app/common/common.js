import angular from 'angular';
import Navbar from './navbar/navbar';
import Language from './language/language';
import Data from './data';
import Navigation from './navigation';
import Preloader from './preloader';
import Expire from './expire';
import Accessibility from './accessibility';
import "./common.scss";
import "./animations.scss";
let commonModule = angular.module('app.common', [
  Navbar,
  Language,
  Data,
  Navigation,
  Preloader,
  Expire,
  Accessibility,
])
.name;

export default commonModule;

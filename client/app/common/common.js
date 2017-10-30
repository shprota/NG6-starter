import angular from 'angular';
import Navbar from './navbar/navbar';
import Language from './language/language';
import Data from './data';
import Navigation from './navigation';
import Preloader from './preloader';
import Expire from './expire';
import "./common.scss";
import "./animations.scss";
let commonModule = angular.module('app.common', [
  Navbar,
  Language,
  Data,
  Navigation,
  Preloader,
  Expire
])
.name;

export default commonModule;

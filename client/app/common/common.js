import angular from 'angular';
import Navbar from './navbar/navbar';
import Language from './language/language';
import Data from './data';
import "./common.scss";
import "./animations.scss";
let commonModule = angular.module('app.common', [
  Navbar,
  Language,
  Data
])
.name;

export default commonModule;

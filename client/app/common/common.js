import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';
import Language from './language/language';
import Data from './data';
import "./common.scss";
import "./animations.scss";
let commonModule = angular.module('app.common', [
  Navbar,
  Hero,
  User,
  Language,
  Data
])
.name;

export default commonModule;

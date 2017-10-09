import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';
import Language from './language/language';

let commonModule = angular.module('app.common', [
  Navbar,
  Hero,
  User,
  Language
])
.name;

export default commonModule;

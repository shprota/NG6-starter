import angular from 'angular';
import UserFactory from './user.factory';

let userModule = angular.module('user', [])

.factory('Language', UserFactory)

.name;

export default userModule;

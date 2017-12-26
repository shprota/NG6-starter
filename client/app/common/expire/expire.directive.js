import template from './expire.html';
import './expire.scss';

let Directive = function (expireService, $timeout) {
  'ngInject';
  let directive = {
    restrict: 'EAC',
    template: template,
    link: link
  };
  return directive;

  function link(scope, el) {
    scope.isShown = true;

    scope.showExpire = function(show = true) {
      //scope.$apply("isShown="+show);
      scope.isShown = show;
      expireService.restart();
    };
  }
};

export default Directive;


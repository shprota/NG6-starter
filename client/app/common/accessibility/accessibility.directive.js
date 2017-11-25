import template from './accessibility.html';
import './accessibility.scss';

let Directive = function (abService) {
  'ngInject';
  let directive = {
    restrict: 'EAC',
    template: template,
    link: link
  };
  return directive;

  function link(scope, el) {
    scope.isShown = false;

    scope.showAb = function(show = true) {
      //scope.$apply("isShown="+show);
      scope.isShown = show;
    };

    scope.toggleContrast = function() {
      scope.isShown = false;
      abService.contrast = !abService.contrast;
    };
    scope.toggleLarge = function() {
      scope.isShown = false;
      abService.large = !abService.large;
    }
  }

};

export default Directive;


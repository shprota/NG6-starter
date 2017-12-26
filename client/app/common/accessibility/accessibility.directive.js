import template from './accessibility.html';
import './accessibility.scss';

let Directive = function (abService, $timeout) {
  'ngInject';
  let directive = {
    restrict: 'EAC',
    template: template,
    link: link
  };
  return directive;

  function link(scope, el) {
    scope.isShown = false;
    scope.abService = abService;

    scope.showExpire = function(show = true) {
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
      $timeout(() => {
        let scrolls = $('.nicescroll');
        scrolls.each((i, s) => {
          let ns = $(s).getNiceScroll(0);
          if (ns) {
            ns.resize();
          }
        });
      });
    }
  }
};

export default Directive;


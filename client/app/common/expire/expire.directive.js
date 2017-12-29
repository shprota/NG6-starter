import template from './expire.html';
import './expire.scss';

let Directive = function ($rootScope, expireService, $timeout, abService, $state) {
  'ngInject';
  const COUNTDOWN_TIME = 5000;
  let timer;
  let directive = {
    restrict: 'EAC',
    template: template,
    link: link
  };
  return directive;


  function link(scope, el) {
    scope.isShown = false;

    function countdown() {
      if ($state.current.name !== 'language') {
        abService.reset();
        $state.go('language');
      }
      expireService.restart();
      scope.isShown = false;
    }


    $rootScope.showExpire = scope.showExpire = function (show = true) {
      //scope.$apply("isShown="+show);
      scope.isShown = show;
      if (show) {
        timer = $timeout(countdown, COUNTDOWN_TIME);
      } else {
        if (timer) {
          $timeout.cancel(timer);
          timer = null;
        }
        expireService.restart();
      }

    };
  }
};

export default Directive;


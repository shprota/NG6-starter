let NavigationDirective = function ($timeout) {
  "ngInject";
  let directive = {
    link: link,
    controller: controller,
    controllerAs: 'ctrl',
    scope: {},
  };
  let navs = {};
  let scope = null;
  return directive;

  function link(scope, el, attrs) {
    let $el = $(el);
    $el.on('keydown', onKeydown);
    $el.attr('tabindex', 1);
    $timeout(() => $el.focus());
  }

  function controller($scope) {
    "ngInject";
    scope = $scope;
    let navLen = 1;
    let navBuf = "";
    navs = {};

    this.addNav = function (key, el) {
      if (!angular.isArray(key)) {
        key = [key];
      }
      key.forEach(k => {
        navs[k] = el;
        if (!isNaN(parseInt(k))) {
          navLen = Math.max(navLen, ("" + k).length);
        }
      });
    };
    this.onKey = function (key) {
      if (~"0123456789".indexOf(key)) {
        navBuf += key;
        if (navBuf.length >= navLen) {
          let el = navs["" + parseInt(navBuf.substr(0, navLen))];
          navBuf = "";
          if (el) {
            el[0].click();
          }
        }
      } else {
        let el = navs[key];
        if (el) {
          navBuf = "";
          el[0].click();
        }
      }
    }
  }

  function onKeydown(e) {
    scope.ctrl.onKey(e.key);
  }

};
export default NavigationDirective;

let NavigationDirective = function ($timeout, languageFactory) {
  "ngInject";
  let directive = {
    link: link,
    controller: controller,
    controllerAs: 'ctrl',
    scope: {},
  };
  let navs = {};
  let scope = null;
  let menu = [];
  let navLen = 1;
  return directive;

  function link(scope, el, attrs) {
    let $el = $(el);
    $el.on('keydown', onKeydown);
    $el.attr('tabindex', 1);
    $timeout(() => $el.focus());
    if (!el.attr('no-play')) {
      $timeout(() => {
        _.forIn(navs, (el, k) => {
          const key = isNaN(parseInt(k)) ? k : '0'.repeat(navLen - k.length) + k;
          const text = el.attr('nav-text') || el.text().trim();
          if (text) {
            menu.push({
              key: key,
              text: text
            });
          }
        });
        languageFactory.playMenu(menu);
      }, 100);
    }
  }

  function controller($scope) {
    "ngInject";
    scope = $scope;
    navLen = 1;
    let navBuf = "";
    navs = {};
    menu = [];

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

function NavItemDirective($timeout) {
  'ngInject';
  return {
    link: link,
    require: '^^keyNav',
    scope: {
      navItem: '<'
    }
  };

  function link(scope, el, attrs, navCtl) {
    navCtl.addNav(scope.navItem, el);
  }
}

export default NavItemDirective;

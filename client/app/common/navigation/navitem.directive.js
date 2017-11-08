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
    $timeout(() => console.log("nav: ", el.text().trim()));
  }
}

export default NavItemDirective;

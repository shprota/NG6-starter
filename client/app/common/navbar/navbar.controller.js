class NavbarController {
  constructor($state) {
    'ngInject';
    this.$state = $state;
    this.name = 'navbar';
  }
  $onInit() {
    this.backlink = this.backlink || 'home';
  }
  toggleDisabled() {
    if (this.dis !== undefined) {
      this.dis = !this.dis;
      console.log("Dis: ", this.dis);
    }
  }
  goBack() {
    if (angular.isFunction(this.backlink)) {
      return this.backlink();
    }
    this.$state.go(this.backlink);
  }
}

export default NavbarController;

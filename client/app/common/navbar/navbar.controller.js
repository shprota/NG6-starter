class NavbarController {
  constructor() {
    this.name = 'navbar';
  }
  $onInit() {
    this.backlink = this.backlink || 'home';
  }
}

export default NavbarController;

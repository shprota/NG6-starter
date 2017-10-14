class NavbarController {
  constructor() {
    this.name = 'navbar';
  }
  $onInit() {
    console.log("Init: ", this.backlink);
    this.backlink = this.backlink || 'home';
  }
}

export default NavbarController;

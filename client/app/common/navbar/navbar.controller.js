class NavbarController {
  constructor() {
    this.name = 'navbar';
  }
  $onInit() {
    this.backlink = this.backlink || 'home';
    console.log("init Dis:",  this.dis)
  }
  toggleDisabled() {
    if (this.dis !== undefined) {
      this.dis = !this.dis;
      console.log("Dis: ", this.dis);
    }
  }
}

export default NavbarController;

class HomeController {
  constructor(dataService, $state, homeCats) {
    "ngInject";
    this.$state = $state;
    this.homeCats = homeCats;
    this.service = dataService;
  }
}

export default HomeController;

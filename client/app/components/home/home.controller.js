class HomeController {
  constructor(dataService, $state, homeCats, $interval, $timeout, languageFactory, expireService, abService) {
    "ngInject";
    this.$state = $state;
    this.homeCats = homeCats;
    this.service = dataService;
    this.$interval = $interval;
    this.$timeout = $timeout;
    this.languageFactory = languageFactory;
    this.expireService = expireService;
    this.abService = abService;
    this.ls = true;
  }
}

export default HomeController;

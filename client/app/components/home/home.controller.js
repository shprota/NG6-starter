class HomeController {
  constructor(dataService, $state, homeCats, $interval, $timeout, languageFactory, expireService) {
    "ngInject";
    this.$state = $state;
    this.homeCats = homeCats;
    this.service = dataService;
    this.$interval = $interval;
    this.$timeout = $timeout;
    this.languageFactory = languageFactory;
    this.expireService = expireService;
    this.ls = true;
  }

  playSound() {

  }

  $postLink() {
    this.playSound();
  }
}

export default HomeController;

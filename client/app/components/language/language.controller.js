class LanguageController {
  constructor(languageFactory, gettext, $state, $interval) {
    "ngInject";
    this.name = 'language';
    this.lng = languageFactory;
    this.$state = $state;
    this.$interval = $interval;
    this.speechTask = $interval(this.speak.bind(this), 10000);
    this.langNo = 0;
    this.langs = Object.keys(languageFactory.langTable);
    this.welcome = gettext("Welcome to Netanya!. For English press 1");
  }

  $onDestroy() {
    this.$interval.cancel(this.speechTask);
  }

  home(lang) {
    this.lng.setLanguage(lang);
    this.$state.go('home');
  }

  speak() {
    this.lng.say(this.welcome, this.langs[this.langNo++]);
    if (this.langNo >= this.langs.length) {
      this.langNo = 0;
    }
  }

}

export default LanguageController;

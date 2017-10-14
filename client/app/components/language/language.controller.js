class LanguageController {
  constructor(languageFactory, $state) {
    "ngInject";
    this.name = 'language';
    this.lng = languageFactory;
    this.$state = $state;
  }

  home(lang) {
    this.lng.setLanguage(lang);
    this.$state.go('home');
  }

}

export default LanguageController;

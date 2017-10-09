class LanguageController {
  constructor(languageFactory, $state) {
    "ngInject";
    this.name = 'language';
    this.lng = languageFactory;
    this.$state = $state;
    console.log(languageFactory.getLanguage());
  }

  home(lang) {
    console.log("Start", lang);
    this.lng.setLanguage(lang);
    this.$state.go('home');
  }

}

export default LanguageController;

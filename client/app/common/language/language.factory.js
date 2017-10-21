class LanguageFactory {
  constructor(gettextCatalog) {
    "ngInject";
    this.language = 'ru';
    this.gettextCatalog = gettextCatalog;
    this.gettextCatalog.setCurrentLanguage(this.language);
  }

  getLanguage() {
    return this.language;
  };

  setLanguage(lang)  {
     this.language = lang;
     this.gettextCatalog.setCurrentLanguage(lang);
  };
}

export default LanguageFactory;

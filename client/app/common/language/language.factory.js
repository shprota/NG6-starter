class LanguageFactory {
  constructor(gettextCatalog) {
    "ngInject";
    this.language = 'en';
    this.gettextCatalog = gettextCatalog;
    this.gettextCatalog.setCurrentLanguage(this.language);

    this.langTable = {
      en: 'USEnglish',
      ru: 'Russian',
      fr: 'Hebrew',
      he: 'Hebrew',
    };
    this.ttsClient = new TTSClient( false );
    this.ttsClient.SetDefaultLanguage( 'USEnglish' );

  }

  getLanguage() {
    return this.language;
  }

  setLanguage(lang)  {
     this.language = lang;
     this.gettextCatalog.setCurrentLanguage(lang);
     this.ttsClient.SetDefaultLanguage( this.langTable[lang] );

  }

  say(text, lang, scope) {
    lang = lang || this.language;
   let sayWhat = this.gettextCatalog.getStringFormFor(lang, text, 1) || text;
    sayWhat = scope ? $interpolate(sayWhat)(scope) : sayWhat;
     lang = this.langTable[lang];
    this.ttsClient.Speak(sayWhat, lang);
  }
}

export default LanguageFactory;

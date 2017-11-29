class LanguageFactory {
  constructor(gettextCatalog, gettext) {
    "ngInject";
    this.language = 'he';
    this.gettextCatalog = gettextCatalog;
    this.gettextCatalog.setCurrentLanguage(this.language);

    // Placeholders
    gettext('Enter');
    gettext('Backspace');
    gettext('Escape');
    this.gettext = gettext;


    this.langTable = {
      en: 'USEnglish',
      ru: 'Russian',
      fr: 'Hebrew',
      he: 'Hebrew',
    };
    this.ttsClient = new TTSClient(false);
    this.ttsClient.SetDefaultLanguage('Hebrew');

  }

  getLanguage() {
    return this.language;
  }

  setLanguage(lang) {
    this.language = lang;
    this.gettextCatalog.setCurrentLanguage(lang);
    this.ttsClient.SetDefaultLanguage(this.langTable[lang]);

  }

  say(text, lang, scope) {
    lang = lang || this.language;
    let sayWhat = this.gettextCatalog.getStringFormFor(lang, text, 1) || text;
    sayWhat = scope ? $interpolate(sayWhat)(scope) : sayWhat;

    if (lang === 'fr') {
      lang = 'French';
    } else {
      lang = this.langTable[lang];
    }
    this.ttsClient.Speak(sayWhat, lang);
  }

  stop() {
    if (this.ttsClient && this.ttsClient.Stop) {
      this.ttsClient.Stop();
    }
  }

  playMenu(menu) {
    const format = this.gettext("Press {{key}} for {{text}}.");
    let text = "";
    let lang = this.language;
    menu.forEach(m => text += " " + this.gettextCatalog.getString(format, m));
    if (lang === 'fr') {
      lang = 'French';
    } else {
      lang = this.langTable[lang];
    }
    this.ttsClient.Speak(text, lang);
  }
}

export default LanguageFactory;

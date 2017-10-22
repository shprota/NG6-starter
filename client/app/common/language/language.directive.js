let LanguageDirective = function (languageFactory) {
  "ngInject";
  var directive = {
    link: link
  }
  return directive;

  function link(scope, el, attrs) {
    console.log("rtl? ", languageFactory.getLanguage());
    if (languageFactory.getLanguage() === 'he') {
      console.log("RTL!");
      $(el).addClass('rtl');
    }
  }
};

export default LanguageDirective;

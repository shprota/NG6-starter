let LanguageDirective = function (languageFactory) {
  "ngInject";
  var directive = {
    link: link
  }
  return directive;

  function link(scope, el, attrs) {
    if (languageFactory.getLanguage() === 'he') {
      $(el).addClass('rtl');
    }
  }
};

export default LanguageDirective;

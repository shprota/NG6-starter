let LanguageFactory = function () {
  let language = 'ru';

  let getLanguage = () => {
    return language;
  };

  let setLanguage = (lang) => {
     language = lang;
  };

  return { getLanguage, setLanguage };
};

export default LanguageFactory;

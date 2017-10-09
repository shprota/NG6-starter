let LanguageFactory = function () {
  let language = 'he';

  let getLanguage = () => {
    return language;
  };

  let setLanguage = (lang) => {
     language = lang;
  };

  return { getLanguage, setLanguage };
};

export default LanguageFactory;

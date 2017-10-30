class HomeController {
  constructor(dataService, $state, homeCats, $interval, $timeout, languageFactory, expireService) {
    "ngInject";
    this.$state = $state;
    this.homeCats = homeCats;
    this.service = dataService;
    this.$interval = $interval;
    this.$timeout = $timeout;
    this.languageFactory = languageFactory;
    this.expireService = expireService;
    this.ls = true;
    this.ttsClient = new TTSClient( false );
    this.ttsClient.SetDefaultLanguage( "Hebrew" );
  }

  say(text, lang) {
    this.ttsClient.Speak(text, lang);
  }

  playSound() {
    let pause = '.';
    console.log("Play sound");
    if (this.ls) {
      this.say("לחזרה לתפריט לחץ 9" + pause, 'Hebrew');
    } else {
     //this.say("Проверка связи" + pause, 'Russian');
      this.say("Hello and welcome" + pause, 'USEnglish');
    }
    this.ls = !this.ls;
    //this.say("לחזרה לתפריט לחץ 9" + pause, 'Hebrew');
  }

  $postLink() {
    // console.log("post link");
    // this.$timeout(() => $('.main').focus(), 50);
    //this.$interval(this.playSound.bind(this), 5000);
  }

  onKey(e) {
    this.expireService.restart();
    switch (e.key) {
      case '1':
        this.$state.go('posts', {section: 'holiday', cat: ''});
        break;
      case '2':
        this.$state.go('posts', {section: 'hotels', cat: ''});
        break;
      case '3':
        this.$state.go('posts', {section: 'enjoying', cat: ''});
        break;
      case '4':
        this.$state.go('posts', {section: 'surroundings', cat: ''});
        break;
      case '5':
        this.$state.go('posts', {section: 'news', cat: ''});
        break;
      case '6':
        this.$state.go('posts', {section: 'contact', cat: ''});
        break;
    }
  }

}

export default HomeController;

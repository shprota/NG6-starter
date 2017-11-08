import '../../../css/bootstrap.css';
import '../../../css/img-gallery.css';

class PostsController {
  constructor(mapsUrl, NgMap, $timeout, $state, $window, languageFactory, expireService, wpUrl, $element, $rootScope) {
    "ngInject";

    this.mapsUrl = mapsUrl;
    this.NgMap = NgMap;
    this.$timeout = $timeout;
    this.$state = $state;
    this.languageFactory = languageFactory;
    this.expireService = expireService;
    this.imgUrl = wpUrl + '/wp-content/uploads/';
    this.$element = $element;
    this.$rootScope = $rootScope;
    $window.scrollTo(0, 0);
    this.setCurrentContent = this._setCurrentContent.bind(this);
    this.backLink = 'home';
    this.isContrast = false;
  }

  $onInit() {
    if (this.section.isCat) {
      this.posts = this.section.posts;
      this.catTitle = this.section.title;
    } else {
      this.posts = this.section.posts.data;
      this.catTitle = this.section.posts.title;
    }
    this.post = this.posts[0];
    if (!this.section.isCat && this.section.name !== 'news') {
      this.locations = this.posts.filter(p => p.location && p.custom_fields.location.length);
    }
    if (this.section.secondLevel) {
      this.backLink = `posts({section: '${this.section.name}', cat: ''})`;
    }
    if (this.section.name !== 'news') {
      this.NgMap.getMap().then(() => {
        this.$timeout(() => $('a[target]').remove(), 1000);
      });
    }
  }


  $postLink() {
    $(this.$element).find('.main').focus();
    this.$timeout(() => {
      $('.nicescroll').each((i, e) => {
        $(e).niceScroll({
          emulatetouch: true,
          cursorcolor: '#888',
          autohidemode: false,
          bouncescroll: true,
          cursordragontouch: true,
          preventmultitouchscrolling: false,
          cursorwidth: 10,
          preservenativescrolling: false,
          nativeparentscrolling: false,
          horizrailenabled: false,
          oneaxismousemode: false,
        });
        $(e).imagesLoaded().always(this.imagesLoaded.bind(this));
      });
    });
  }

  $onDestroy() {
    $('.nicescroll').each((i, e) => {
      $(e).getNiceScroll().remove();
    });
  }

  imagesLoaded(instance) {
    this.$timeout(() => {
      let el = $(instance.elements[0]);
      let ns = el.getNiceScroll(0);
      if (!ns) {
        ns = el.parents('.nicescroll').getNiceScroll(0);
      }
      if (ns) {
        ns.resize();
      }
    });
  }


  setSelInView() {
    let menu = $('#menu-container');
    let sel = $('ul.leftmenu li.selected');
    if (!sel.length) {
      return;
    }
    if (sel.offset().top - menu.offset().top + sel.height() > menu.height() || sel.offset().top - menu.offset().top < 0) {
      let realOffset = sel.offset().top + menu.scrollTop();
      let target = menu.height() / 2 - sel.height() / 2;
      let scrollTo = realOffset - target;
      menu.animate({
        scrollTop: scrollTo
      }, 200);
    }
  }


  _setCurrentContent(ev, post) {
    post = post || ev;
    //let ns = $('.right .inner').getNiceScroll(0);
    this.expireService.restart();

    const selector = this.section.name === 'news' ? '.right .inner' : '.info';
    $(selector).scrollTop(0);


    this.post = post;
    if (this.section.name !== 'news') {
      this.showItem = true;
    }
    this.$timeout(() => {
      this.setSelInView();
      $('.postcontent').imagesLoaded().always(this.imagesLoaded.bind(this));
    });

    this.$timeout(() => {
      this.languageFactory.say(post.content.replace(/<[^>]+>/gm, ''));
    }, 300);

  }

  loadCat(cat) {
    this.$state.go('.', {section: this.section.name, cat: cat});
  }
}

export default PostsController;

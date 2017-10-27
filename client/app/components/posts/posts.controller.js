import '../../../css/bootstrap.css';
import '../../../css/img-gallery.css';

class PostsController {
  constructor(mapsUrl, NgMap, $timeout, $state, $window, languageFactory, $element, $rootScope) {
    "ngInject";

    this.mapsUrl = mapsUrl;
    this.$timeout = $timeout;
    this.$state = $state;
    this.languageFactory = languageFactory;
    this.$element = $element;
    this.$rootScope = $rootScope;
    $window.scrollTo(0, 0);
    this.setCurrentContent = this._setCurrentContent.bind(this);
    this.backLink = 'home';
    this.isContrast = false;
    NgMap.getMap().then(() => {
      $('a[target]').remove();
    });
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
      this.locations = this.posts.filter(p => p.custom_fields.location && p.custom_fields.location.length);
    }
    if (this.section.secondLevel) {
      this.backLink = `posts({section: '${this.section.name}', cat: ''})`;
    }
  }


  $postLink() {
    $(this.$element).find('.main').focus();
    this.$timeout(() => {
      $('.nicescroll').each((i, e) => {
        $(e).niceScroll({
          emulatetouch: true,
          cursorcolor: '#888',
          autohidemode: 'scroll',
          bouncescroll: true,
          cursordragontouch: true,
          preventmultitouchscrolling: false,
        });
        $(e).imagesLoaded().always(this.imagesLoaded.bind(this));
      });
    });
  }

  imagesLoaded(instance) {
    console.log("images loaded", instance);
    this.$timeout(() => {
      let el = $(instance.elements[0]);
      let ns = el.getNiceScroll(0);
      if (!ns) {
        ns = el.parents('.nicescroll').getNiceScroll(0);
      }
      ns.resize();
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
/*
    this.$timeout(() => {
      let ns = $(selector).getNiceScroll(0);
      ns.resize();
    }, 300);
*/
  }

  loadCat(cat) {
    this.$state.go('.', {section: this.section.name, cat: cat});
  }

  onKey(e) {
    if (~['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(e.key)) {
      console.log("Key: ", e);
      let post = this.posts[parseInt(e.key)];
      this._setCurrentContent(post);
    }
  }
}

export default PostsController;

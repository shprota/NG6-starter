import '../../../css/bootstrap.css';
import '../../../css/img-gallery.css';

class PostsController {
  constructor(mapsUrl, $timeout, $state, $window, $animate, $element) {
    "ngInject";

    this.mapsUrl = mapsUrl;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$element = $element;
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
      this.locations = this.posts.filter(p => p.custom_fields.location && p.custom_fields.location.length);
    }
    if (this.section.secondLevel) {
      this.backLink = `posts({section: '${this.section.name}', cat: ''})`;
    }
  }


  $postLink() {
    $(this.$element).find('.main').focus();
    this.$timeout(() => {
      $('.nicescroll').each((i, e) => $(e).niceScroll({touchbehavior:true, cursorcolor: '#888', autohidemode: 'scroll'}).resize());
      let ns = $('.leftmenu').getNiceScroll(0);
      ns.resize();
    }, 600);
  }


  _setCurrentContent(ev, post) {
    post = post || ev;
    //let ns = $('.right .inner').getNiceScroll(0);

    const selector = this.section.name === 'news' ? '.right .inner' : '.info';
    let ns = $(selector).getNiceScroll(0);
    if (!ns) {
      ns = $(selector).niceScroll({touchbehavior:true, cursorcolor: '#888', autohidemode: 'scroll'});
    }
    ns.doScrollTop(0, 1);


    this.post = post;
    if (this.section.name !== 'news') {
      this.showItem = true;
    }
    this.$timeout(() => {
      ns.resize();
    }, 300);
  }

  loadCat(cat) {
    this.$state.go('.', {section: this.section.name, cat: cat});
  }

  onKey(e) {
    if(~['0','1','2','3','4','5','6','7','8','9'].indexOf(e.key)) {
      console.log("Key: ", e);
      let post = this.posts[parseInt(e.key)];
      this._setCurrentContent(post);
    }
  }
}

export default PostsController;

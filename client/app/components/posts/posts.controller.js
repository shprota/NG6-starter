import '../../../css/bootstrap.css';
import '../../../css/img-gallery.css';

class PostsController {
  constructor(mapsUrl, $timeout, $state, $window, $animate) {
    "ngInject";

    this.mapsUrl = mapsUrl;
    this.$timeout = $timeout;
    this.$state = $state;
    $window.scrollTo(0, 0);
    this.setCurrentContent = this._setCurrentContent.bind(this);
    this.backLink = 'home';
    $animate.on('leave', $('.animate'), (el) => {
      this.$timeout(() => {
        $('.nicescroll').niceScroll({touchbehavior:true, cursorcolor: '#888'});
        let ns = $('.leftmenu').getNiceScroll(0);
        ns.resize();
      }, 1000);
    });
  }

  $onInit() {
    this.post = this.posts[0];
    if (!this.section.isCat && this.section.name !== 'news') {
      this.locations = this.posts.filter(p => p.custom_fields.location && p.custom_fields.location.length);
    }
    if (this.section.secondLevel) {
      this.backLink = `posts({section: '${this.section.name}', cat: ''})`;
    }
  }

  _setCurrentContent(ev, post) {
    post = post || ev;
    //let ns = $('.right .inner').getNiceScroll(0);
    console.log("Post: ", post);
    const ns = $('.info').getNiceScroll(0);
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
}

export default PostsController;

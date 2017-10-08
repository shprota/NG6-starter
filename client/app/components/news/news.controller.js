import '../../../css/bootstrap.css';
import '../../../css/img-gallery.css';

class NewsController {
  constructor(newsService, $timeout) {
    "ngInject";
    this.$timeout = $timeout;
    this.name = 'news';
    this.service = newsService;
    this.currentPost = "Loading...";
    this.posts = [];
    this.service.loadNews()
      .then(news => {
        console.log("News: ", news);
        this.currentPost = news.posts[0];
        //this.posts = _.uniqBy(news.posts, 'id');
        this.posts = news.posts;
        console.log(this.posts.map(p=>p.id));
        this.$timeout(() => {
          $('#leftmenu').getNiceScroll(0).resize();
          $('.right .inner').getNiceScroll(0).resize();
        }, 200);
      });
  }
  setCurrentContent(post) {

    let el = $('<div>' + post.content + '</div>');
    el.find('.b-wrapper').remove();
    el.find('script').remove();
    post.content = el.html();

    window.curPost = post;
    this.currentPost = post;
    this.$timeout(() => {
      let ns = $('.right .inner').getNiceScroll(0);
      ns.doScrollTop(0, 0);
      ns.resize();
    }, 500);
  }
}

export default NewsController;

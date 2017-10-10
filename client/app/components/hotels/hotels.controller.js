class HotelsController {
  constructor(hotelsService, languageFactory, NgMap, $timeout) {
    "ngInject";
    this.name = 'hotels';
    this.$timeout = $timeout;
    this.service = hotelsService;
    this.lng = languageFactory;
    this.currentPost = "Loading...";
    this.posts = [];
    this.locations = [];
    NgMap.getMap().then(map => this.map = map);
    this.service.loadHotels(this.lng.getLanguage())
      .then(hotels => {
        console.log("Hotels: ", hotels);
        this.currentPost = hotels.posts[0];
        this.posts = hotels.posts;
        this.locations = this.posts.filter(p => p.custom_fields.location && p.custom_fields.location.length);
      });

    this.showInfo = this._showInfo.bind(this);
  }

  setCurrentContent(item) {
    let el = $('<div>' + item.content + '</div>');
    el.find('.b-wrapper').remove();
    el.find('script').remove();
    item.content = el.html();

    this.post = item;
    this.$timeout(() => {
      let ns = $('.info').getNiceScroll(0);
      ns.doScrollTop(0, 0);
      ns.resize();
    }, 500);

  }

  _showInfo(e, item) {
    this.setCurrentContent(item);
    console.log("Show info", this);
    this.map.showInfoWindow('hotel-info', "custom-marker-"+item.id);
  }
}

export default HotelsController;

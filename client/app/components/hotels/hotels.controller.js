class HotelsController {
  constructor(hotelsService, languageFactory, $timeout) {
    "ngInject";
    this.name = 'hotels';
    this.$timeout = $timeout;
    this.service = hotelsService;
    this.lng = languageFactory;
    this.currentPost = "Loading...";
    this.posts = [];
    this.locations = [];
    this.service.loadHotels(this.lng.getLanguage())
      .then(hotels => {
        console.log("Hotels: ", hotels);
        this.currentPost = hotels.posts[0];
        this.posts = hotels.posts;
        this.locations = this.posts.filter(p => p.custom_fields.location && p.custom_fields.location.length);
      });
  }
}

export default HotelsController;

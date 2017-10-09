class HotelsService {

    constructor($http) {
        "ngInject";
        this.$http = $http;
    }

    loadHotels(lang) {
      return this.$http.get("http://gn.shprota.com/?cat=13&json=1&lang="+lang)
        .then(resp => {
          console.log(resp);
          return resp.data;
        });
    }

}

export default HotelsService;

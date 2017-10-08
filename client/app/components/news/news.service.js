class NewsService {

    constructor($http) {
        "ngInject";
        this.$http = $http;
    }

    loadNews() {
      return this.$http.get("http://gn.shprota.com/?cat=66&json=1&lang=ru")
        .then(resp => {
          console.log(resp);
          return resp.data;
        });
    }

}

export default NewsService;

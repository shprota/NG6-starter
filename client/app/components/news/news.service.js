class NewsService {

    constructor($http) {
        "ngInject";
        this.$http = $http;
    }

    loadNews(lang) {
      return this.$http.get("http://gn.shprota.com/?cat=66&json=1&lang="+lang)
        .then(resp => {
          console.log(resp);
          return resp.data;
        });
    }

}

export default NewsService;

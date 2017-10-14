import _ from 'lodash';

class DataService {
  constructor(languageFactory, $http, wpUrl) {
    "ngInject";
    this.lang = languageFactory;
    this.$http = $http;
    this.wpUrl = wpUrl;
    this.cats = [];
    this.posts = [];
    this.homeCats = {
      news: {
        he: {
          id: 45
        },
        en: {
          id: 61
        },
        fr: {
          id: 65
        },
        ru: {
          id: 66
        }
      },
      hotels: {
        he: {
          id: 17
        },
        en: {
          id: 8
        },
        fr: {
          id: 18
        },
        ru: {
          id: 13
        }
      },
      holiday: {
        isCat: true,
        he: {
          id: 196
        },
        en: {
          id: 197
        },
        fr: {
          id: 198
        },
        ru: {
          id: 199
        }
      },
      enjoying: {
        isCat: true,
        he: {
          id: 173
        },
        en: {
          id: 174
        },
        fr: {
          id: 175
        },
        ru: {
          id: 176
        }
      },
      surroundings: {
        isCat: true,
        he: {
          id: 48
        },
        en: {
          id: 56
        },
        fr: {
          id: 90
        },
        ru: {
          id: 77
        }
      }
    };
  }

  getSection(section) {
    const lang = this.lang.getLanguage();
    try {
      let cat = this.homeCats[section][lang];
      cat.isCat = this.homeCats[section].isCat;
      return _.clone(cat);
    } catch (e) {
      return '';
    }
  }

  _filterContent(item) {
    let el = $('<div>' + item.content + '</div>');
    el.find('.b-wrapper').remove();
    el.find('script').remove();
    el.find('a').each((i, a) => a.outerHTML = $(a).html());
    item.content = el.html();
  }

  _filterCategories(parent) {
    return parent ?
      this.cats[this.lang.getLanguage()].data.filter(c => c.parent === parent)
      : this.cats[this.lang.getLanguage()];
  }

  getCategories(parent) {
    const lang = this.lang.getLanguage();
    if (this.cats[lang] && new Date - this.cats[lang].time < 12 * 3600000) {
      return Promise.resolve(this._filterCategories(parent));
    }
    return this.$http.get(this.wpUrl + "/?json=get_category_index&lang=" + lang)
      .then(resp => {
        this.cats[lang] = {
          data: resp.data.categories,
          time: new Date
        };
        if (!parent) {
          _.forIn(this.homeCats, (val) => {
            val[lang]['title'] = _.find(resp.data.categories, {id: val[lang].id}).title;
          });
        }
        return this._filterCategories(parent);
      });
  }

  getPosts(cat) {
    this.posts[this.lang.getLanguage()] = this.posts[this.lang.getLanguage()] || [];
    if (this.posts[this.lang.getLanguage()][cat] && new Date() - this.posts[this.lang.getLanguage()][cat].time < 3 * 3600000) {
      return Promise.resolve(this.posts[this.lang.getLanguage()][cat].data);
    }
    return this.$http.get(this.wpUrl + `/?cat=${cat}&json=1&lang=${this.lang.getLanguage()}`)
      .then(resp => {
        let posts = resp.data.posts;
        posts.forEach(this._filterContent);
        this.posts[this.lang.getLanguage()][cat] = {
          data: posts,
          time: new Date
        }
        return posts;
      });
  }
}

export default DataService;

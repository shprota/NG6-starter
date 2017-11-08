import _ from 'lodash';

class DataService {
  constructor(languageFactory, $http, wpUrl, $q) {
    "ngInject";
    this.lang = languageFactory;
    this.$http = $http;
    this.wpUrl = wpUrl;
    this.imgUrl = wpUrl + '/wp-content/uploads/';
    this.$q = $q;
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

  _filterCategories(parent, lang = false) {
    lang = lang || this.lang.getLanguage();
    return parent ?
      this.cats[lang].data.filter(c => c.parent === parent)
      : this.cats[lang];
  }

  getCategories(parent, lang = false) {
    lang = lang || this.lang.getLanguage();
    if (this.cats[lang] && new Date - this.cats[lang].time < 12 * 3600000) {
      return Promise.resolve(this._filterCategories(parent, lang));
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
        return this._filterCategories(parent, lang);
      });
  }

  getPosts(cat, count = 2000, lang = false) {
    lang = lang || this.lang.getLanguage();
    this.posts[lang] = this.posts[lang] || [];
    if (this.posts[lang][cat] && new Date() - this.posts[lang][cat].time < 3 * 3600000) {
      return Promise.resolve(this.posts[lang][cat]);
    }
    return this.$http.get(this.wpUrl + `/?cat=${cat}&json=1&lang=${lang}&count=${count}`)
      .then(resp => {
        let posts = resp.data.posts.map((p) => {
          const fldImage = _.get(p, 'custom_fields.dfiFeatured[0]');
          const m = fldImage && fldImage.match(/,(\/.*?)";/);
          const kiosk_content = '<p>'+_.get(p, 'custom_fields.kiosk_content[0]', p.content)+'</p>';
          return {
            id: p.id,
            title: p.title,
            content: kiosk_content.length && kiosk_content || p.content,
            thumbnail: p.thumbnail,
            custom_fields: p.custom_fields,
            date: _.get(p, 'custom_fields.hwe_date[0]'),
            location: _.get(p, 'custom_fields.location[0]'),
            titleImage: m && this.imgUrl + m[1]
          };
        });
        resp.data.posts.forEach(this._filterContent);
        return this.posts[lang][cat] = {
          data: posts,
          title: resp.data.category.title,
          time: new Date
        };
      });
  }

  preload(progress) {
    let langs = ['he', 'en', 'fr', 'ru'];
    let promises = langs.map(l => this.getCategories(null, l));
    progress = progress || (() => {
    });
    let total = 0;
    let curProgress = 1;
    return Promise.all(promises)
      .then(() => {
        promises = [];
        progress(1, 20);
        _.forIn(this.homeCats, (cat, catname) => {
          if (cat.isCat) {
            langs.forEach(l => {
              let cats = this.cats[l].data.filter(c => c.parent === cat[l].id);
              cats.forEach(c => {
                total++;
                promises.push(this.getPosts(c.id, 2000, l).then(() => progress(++curProgress, total)));
              });
            })
          } else {
            langs.forEach(l => {
              total++;
              promises.push(this.getPosts(cat[l].id, catname === 'news' ? 20 : 2000, l)
                .then(() => progress(++curProgress, total)));
            });
          }
        });
        return Promise.all(promises);
      });
  }
}

export default DataService;

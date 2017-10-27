import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import uiRouter from '@uirouter/angularjs';
import postsComponent from './posts.component';
import 'jquery';
import 'niceScroll';
import 'ngNiceScroll';
import imagesLoaded from 'imagesloaded/imagesloaded';

let postsModule = angular.module('posts', [
  uiRouter,
  ngSanitize,
  'angular-nicescroll',
])
  .config(($stateProvider) => {
    "ngInject";
    imagesLoaded.makeJQueryPlugin();
    $stateProvider
      .state('posts', {
        url: '/posts/:section/:cat?',
        component: 'posts',
        resolve: {
/*
          posts: function (dataService, $stateParams) {
            "ngInject";
            let cat = dataService.getSection($stateParams['section']);
            if ($stateParams['cat']) {
              cat.isCat = false;
              cat.id = $stateParams['cat'];
            }
            if (!cat) {
              throw new Error("Invalid url");
            }
            return cat.isCat ? dataService.getCategories(cat.id) : dataService.getPosts(cat.id);
          },
*/
          section: function (dataService, $stateParams) {
            "ngInject";
            return dataService.getCategories()
              .then(c => {
                let section = dataService.getSection($stateParams['section']);
                section.name = $stateParams['section'];
                if ($stateParams['cat']) {
                  section.isCat = false;
                  section.id = $stateParams['cat'];
                  section.secondLevel = true;
                }
                return section;
              })
              .then(section => {
                let count = section.name === 'news'? 20 : 2000;
                return (section.isCat ? dataService.getCategories(section.id) : dataService.getPosts(section.id, count))
                  .then(posts => {
                    section.posts = posts;
                    return section;
                  });
              });
          },
        }
      });
  })

  .component('posts', postsComponent)

  .name;

export default postsModule;

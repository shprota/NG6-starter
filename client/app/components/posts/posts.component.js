import template from './posts.html';
import controller from './posts.controller';
import './posts.scss';

let postsComponent = {
  bindings: {
    posts: '<',
    section: '<',
  },
  template,
  controller
};

export default postsComponent;

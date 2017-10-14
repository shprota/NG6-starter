import template from './app.html';
import './app.scss';

let appComponent = {
  template,
  controller: function() {
    this.animate = "animate";
  }
};

export default appComponent;

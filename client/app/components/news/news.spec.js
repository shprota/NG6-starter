import NewsModule from './news';
import NewsController from './news.controller';
import NewsComponent from './news.component';
import NewsTemplate from './news.html';

describe('News', () => {
  let $rootScope, makeController;

  beforeEach(window.module(NewsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new NewsController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(NewsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = NewsComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(NewsTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(NewsController);
    });
  });
});

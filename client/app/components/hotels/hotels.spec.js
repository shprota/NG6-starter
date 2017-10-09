import HotelsModule from './hotels';
import HotelsController from './hotels.controller';
import HotelsComponent from './hotels.component';
import HotelsTemplate from './hotels.html';

describe('Hotels', () => {
  let $rootScope, makeController;

  beforeEach(window.module(HotelsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new HotelsController();
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
      expect(HotelsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = HotelsComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(HotelsTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(HotelsController);
    });
  });
});

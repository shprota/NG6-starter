import LanguageModule from './language';
import LanguageController from './language.controller';
import LanguageComponent from './language.component';
import LanguageTemplate from './language.html';

describe('Language', () => {
  let $rootScope, makeController;

  beforeEach(window.module(LanguageModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new LanguageController();
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
      expect(LanguageTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = LanguageComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(LanguageTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(LanguageController);
    });
  });
});

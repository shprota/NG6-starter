describe('Service: news.news.service', function () {

    // load the service's module
    beforeEach(module('news'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (_news.service_) {
        service = _news.service_;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });
});

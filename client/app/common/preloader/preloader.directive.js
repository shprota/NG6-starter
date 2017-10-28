let Preloader = function ($animate, $timeout, $q, dataService) {
  'ngInject';

  let directive = {
    restrict: 'EAC',
    template:
    '<div class="preloader-progress">' +
    '<div class="preloader-progress-bar" ' +
    'ng-style="{width: loadCounter + \'%\'}"></div>' +
    '</div>'
    ,
    link: link
  };
  return directive;

  function link(scope, el) {

    scope.loadCounter = 0;

    let counter = 0;
    let timeout;
    el.addClass('preloader');
    dataService.preload().then(endCounter);
    timeout = $timeout(startCounter);

    function startCounter() {

      const remaining = 100 - counter;
      counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

      scope.loadCounter = parseInt(counter, 10);

      timeout = $timeout(startCounter, 20);
    }

    function endCounter() {

      $timeout.cancel(timeout);

      scope.loadCounter = 100;

      $timeout(function () {
        // animate preloader hiding
        $animate.addClass(el, 'preloader-hidden');
        // retore scrollbar
        angular.element('body').css('overflow', '');
      }, 300);
    }

    function appReady() {
      var deferred = $q.defer();

      $timeout(() => deferred.resolve(), 5000);
      return deferred.promise;
    }
  }
};

export default Preloader;

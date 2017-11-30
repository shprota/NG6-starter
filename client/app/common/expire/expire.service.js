import io from 'socket.io-client';

class ExpireService {
  constructor($rootScope, $timeout, $state, abService) {
    "ngInject";
    this.EXPIRE_TIME = 300000;
    this.$timeout = $timeout;
    this.$state = $state;
    this.abService = abService;
    this.socket = io('http://netanya.shprota.com');
    this.socket.on('reload', function (data) {
        console.log("Reload request");
        location.reload(true);
    });
    $(document).on('click', () => {
      $rootScope.$apply(() => this.restart());
    });
  }

  restart() {
    if (this.timer) {
      this.$timeout.cancel(this.timer);
    }
    this.timer = this.$timeout(this.expire.bind(this), this.EXPIRE_TIME);
  }

  expire() {
    if (this.$state.current.name !== 'language') {
      this.abService.reset();
      this.$state.go('language');
    }
    this.restart();
  }
}

export default ExpireService;


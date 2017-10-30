class ExpireService {
  constructor($timeout, $state) {
    "ngInject";
    this.EXPIRE_TIME = 120000;
    this.$timeout = $timeout;
    this.$state = $state;
  }

  restart() {
    if (this.timer) {
      this.$timeout.cancel(this.timer);
    }
    this.timer = this.$timeout(this.expire.bind(this), this.EXPIRE_TIME);
  }

  expire() {
    if (this.$state.current.name !== 'language') {
      this.$state.go('language');
    }
    this.restart();
  }
}

export default ExpireService;


export default class pubsub {
  constructor() {
    this.subs = [];
  }

  subscribe(fn) {
    this.subs = [...this.subs, fn];
  }

  unsubscribe(fn) {
    this.subs = this.subs.filter(s => s !== fn);
  }

  notify() {
    this.subs.forEach(fn => fn());
  }
}

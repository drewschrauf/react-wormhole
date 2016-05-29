export default class pubsub {
  constructor() {
    this.subs = [];
  }

  subscribe(fn) {
    this.subs = [...this.subs, fn];
  }

  notify() {
    this.subs.forEach(fn => fn());
  }
}

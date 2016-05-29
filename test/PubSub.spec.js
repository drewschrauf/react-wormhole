/* eslint no-unused-expressions:0 */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import PubSub from '../src/PubSub';

describe('PubSub', () => {
  let pubsub;
  let handler;
  beforeEach(() => {
    pubsub = new PubSub();
    handler = sinon.stub();
  });

  it('should invoke a subscribed handler on notify', () => {
    pubsub.subscribe(handler);
    pubsub.notify();
    expect(handler).to.have.been.called;
  });

  it('should remove a subscribed handler on unsubscribe', () => {
    const anotherHandler = sinon.stub();
    pubsub.subscribe(handler);
    pubsub.subscribe(anotherHandler);
    pubsub.notify();
    pubsub.unsubscribe(handler);
    pubsub.notify();
    expect(handler).to.have.been.calledOnce;
    expect(anotherHandler).to.have.been.calledTwice;
  });
});

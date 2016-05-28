import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
chai.use(chaiEnzyme());

import Wormhole, { wormholeConnect } from '../src';

const ChildComp = () => (
  <div />
);

describe('Wormhole', () => {
  it('should pass through props from context', () => {
    const ConnectedChild = wormholeConnect()(ChildComp);
    const root = mount(
      <Wormhole test="test">
        <ConnectedChild />
      </Wormhole>
    );
    const child = root.find('ChildComp');
    expect(child).to.have.prop('test', 'test');
  });

  it('should allow wormhole props to be transformed', () => {
    const ConnectedChild = wormholeConnect(c => ({ changed: c.test }))(ChildComp);
    const root = mount(
      <Wormhole test="test">
        <ConnectedChild />
      </Wormhole>
    );
    const child = root.find('ChildComp');
    expect(child).to.have.prop('changed', 'test');
  });

  it('should provide original props to child', () => {
    const ConnectedChild = wormholeConnect(c => ({ changed: c.test }))(ChildComp);
    const root = mount(
      <Wormhole test="test">
        <ConnectedChild another="another" />
      </Wormhole>
    );
    const child = root.find('ChildComp');
    expect(child).to.have.prop('changed', 'test');
    expect(child).to.have.prop('another', 'another');
  });

  it('should rerender on context change');
  it('should subscribe to changes on mount');
  it('should unsubscribe from changes on unmount');
});

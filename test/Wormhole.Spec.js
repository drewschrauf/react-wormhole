import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React, { Component } from 'react';
chai.use(chaiEnzyme());

import Wormhole, { wormholeConnect } from '../src';

// TESTING COMPONENTS
const ChildComp = () => (
  <div />
);

class PureComp extends Component {
  static propTypes = {
    children: React.PropTypes.node,
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return this.props.children;
  }
}

// TESTS
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

  it('should rerender on context change', () => {
    const ConnectedChild = wormholeConnect()(ChildComp);
    const root = mount(
      <Wormhole test="test">
        <PureComp>
          <ConnectedChild />
        </PureComp>
      </Wormhole>
    );
    expect(root.find('ChildComp')).to.have.prop('test', 'test');
    root.setProps({ test: 'change' });
    expect(root.find('ChildComp')).to.have.prop('test', 'change');
  });

  // TODO test this in a way that doesn't require reading internal state
  it('should unsubscribe from changes on unmount', () => {
    const ConnectedChild = wormholeConnect()(ChildComp);
    const WrapperComp = props => (
      <div>{props.render && props.children}</div>
    );
    WrapperComp.propTypes = {
      render: React.PropTypes.bool,
      children: React.PropTypes.node,
    };
    const ConnectedWrapper = wormholeConnect()(WrapperComp);

    const root = mount(
      <Wormhole render>
        <ConnectedWrapper>
          <ConnectedChild another="another" />
        </ConnectedWrapper>
      </Wormhole>
    );
    expect(root.state().pubsub.subs).to.have.length(2);
    root.setProps({ render: false });
    expect(root.state().pubsub.subs).to.have.length(1);
  });
});

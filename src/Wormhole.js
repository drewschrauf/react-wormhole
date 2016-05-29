import React, { Component } from 'react';
import PubSub from './PubSub';
import omit from 'lodash.omit';

export default class Wormhole extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  }

  static childContextTypes = {
    wormhole: React.PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      pubsub: new PubSub(),
    };
  }

  getChildContext() {
    return {
      wormhole: {
        pubsub: this.state.pubsub,
        getProps: this.getProps,
      },
    };
  }

  componentDidUpdate() {
    this.state.pubsub.notify();
  }

  getProps = () => omit(this.props, 'children');

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

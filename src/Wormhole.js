import React, { Component } from 'react';
import omit from 'lodash.omit';

export default class Wormhole extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  }

  static childContextTypes = {
    wormhole: React.PropTypes.object,
  }

  getChildContext() {
    return {
      wormhole: omit(this.props, 'children'),
    };
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

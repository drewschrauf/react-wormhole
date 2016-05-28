import React, { Component } from 'react';

class WormholeConnector extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    transformContext: React.PropTypes.func,
  }

  static contextTypes = {
    wormhole: React.PropTypes.object.isRequired,
  }

  render() {
    const { children, transformContext } = this.props;
    const { wormhole } = this.context;
    const additionalProps = transformContext ? transformContext(wormhole) : wormhole;

    return React.cloneElement(React.Children.only(children), { ...additionalProps });
  }
}

// wormholeConnect
export default transformFn => (
  Comp => (
    props => (
      <WormholeConnector transformContext={transformFn}><Comp {...props} /></WormholeConnector>
    )
  )
);

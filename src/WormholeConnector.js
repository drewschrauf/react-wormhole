import React, { Component } from 'react';

class Wormhole extends Component {
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

export default transformFn => (
  Comp => (
    props => (
      <Wormhole transformContext={transformFn}><Comp {...props} /></Wormhole>
    )
  )
);

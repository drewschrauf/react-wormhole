import React, { Component } from 'react';

class WormholeConnector extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    transformContext: React.PropTypes.func,
  }

  static contextTypes = {
    wormhole: React.PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      props: context.wormhole.getProps(),
      updater: () => {
        this.setState({
          props: this.context.wormhole.getProps(),
        });
      },
    };
  }

  componentDidMount() {
    this.context.wormhole.pubsub.subscribe(this.state.updater);
  }

  render() {
    const { children, transformContext } = this.props;
    const { props } = this.state;
    const additionalProps = transformContext ? transformContext(props) : props;

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

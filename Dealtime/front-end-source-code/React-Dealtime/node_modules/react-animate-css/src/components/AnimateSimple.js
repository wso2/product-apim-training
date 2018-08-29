import React, { Component, PropTypes } from 'react';
import { getAnimationTiming } from '../index';
import animationClasses from '../animateClasses.json';

class AnimateSimple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animating: Boolean(props.type),
    };
  }

  componentDidMount() {
    const { type } = this.props;

    if (type) {
      this.setAnimating(type);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { animating } = this.state;

    if (nextProps.type && !animating) {
      this.setAnimating(nextProps.type);
    }
  }

  setAnimating(animation) {
    this.setState({ animating: true });
    setTimeout(() => this.setState({ animating: false }), getAnimationTiming(animation));
  }

  render() {
    const { type } = this.props;
    const { animating } = this.state;

    return (
      <div className={animating ? `animated ${type}` : null}>
        {this.props.children}
      </div>
    );
  }
}

AnimateSimple.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.string,
  type: PropTypes.oneOf(animationClasses),
  timeout: PropTypes.number,
};

AnimateSimple.defaultProps = {
  type: null,
  enter: null,
  leave: null,
  appear: null,
  component: 'div',
  forceAnimation: false,
};

export default AnimateSimple;

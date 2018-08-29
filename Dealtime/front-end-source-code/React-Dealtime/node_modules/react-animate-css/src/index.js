import React, { PureComponent, PropTypes } from 'react';
import AnimateSimple from './components/AnimateSimple';
import AnimateTransitionGroup from './components/AnimateTransitionGroup';
import animationClasses from './animateClasses.json';

export const getAnimationTiming = (anim) => {
  switch (anim) {
    case 'hinge':
      return 2000;
    case 'flipOutX':
    case 'flipOutY':
    case 'bounceIn':
    case 'bounceOut':
      return 750;
    default:
      return 1000;
  }
};

class Animate extends PureComponent {
  render() {
    const { component, enter, leave, appear,
      type, appearTimeout, enterTimeout, leaveTimeout } = this.props;

    if (type) {
      return (
        <AnimateSimple type={type}>
          {this.props.children}
        </AnimateSimple>
      );
    }

    return (
      <AnimateTransitionGroup
        component={component}
        appear={appear}
        enter={enter}
        leave={leave}
        appearTimeout={appearTimeout}
        enterTimeout={enterTimeout}
        leaveTimeout={leaveTimeout}
      >
        {this.props.children}
      </AnimateTransitionGroup>
    );
  }
}

Animate.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.string,
  appear: PropTypes.oneOf(animationClasses),
  enter: PropTypes.oneOf(animationClasses),
  leave: PropTypes.oneOf(animationClasses),
  type: PropTypes.oneOf(animationClasses),
  appearTimeout: PropTypes.number,
  enterTimeout: PropTypes.number,
  leaveTimeout: PropTypes.number,
};

Animate.defaultProps = {
  type: null,
  enter: null,
  leave: null,
  appear: null,
  appearTimeout: 1000,
  enterTimeout: 1000,
  leaveTimeout: 1000,
  component: 'div',
  forceAnimation: false,
};

export default Animate;

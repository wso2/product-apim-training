import React, { PureComponent, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getAnimationTiming } from '../index';
import animationClasses from '../animateClasses.json';

class AnimateTransitionGroup extends PureComponent {
  render() {
    const { enter, leave, appear, component } = this.props;
    let { appearTimeout, enterTimeout, leaveTimeout } = this.props;

    if (!appearTimeout) {
      appearTimeout = getAnimationTiming(appear);
    }

    if (!enterTimeout) {
      enterTimeout = getAnimationTiming(enter);
    }

    if (!enterTimeout) {
      leaveTimeout = getAnimationTiming(leave);
    }

    return (
      <ReactCSSTransitionGroup
        component={component}
        transitionName={{ enter, leave, appear }}
        transitionAppear={Boolean(appear)}
        transitionAppearTimeout={appearTimeout}
        transitionEnterTimeout={enterTimeout}
        transitionLeaveTimeout={leaveTimeout}
      >
        <div className="animated">
          {this.props.children}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

AnimateTransitionGroup.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.string,
  appear: PropTypes.oneOf(animationClasses),
  enter: PropTypes.oneOf(animationClasses),
  leave: PropTypes.oneOf(animationClasses),
  appearTimeout: PropTypes.number,
  enterTimeout: PropTypes.number,
  leaveTimeout: PropTypes.number,
};

AnimateTransitionGroup.defaultProps = {
  enter: null,
  leave: null,
  appear: null,
  component: 'div',
};

export default AnimateTransitionGroup;

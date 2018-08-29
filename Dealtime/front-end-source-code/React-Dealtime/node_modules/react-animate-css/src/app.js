import React, { Component } from 'react';
import Animate from './index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: null,
      forceAnimation: false,
    };

    this.onAnimChange = this.onAnimChange.bind(this);
    this.onAnimClick = this.onAnimClick.bind(this);
  }

  onAnimChange(e) {
    e.preventDefault();

    this.setState({ animation: e.target.value });
  }

  onAnimClick(e) {
    const { animation } = this.state;

    this.setState({ animation: !animation ? 'bounce' : animation });

    e.preventDefault();
  }

  render() {
    const { animation } = this.state;

    return (
      <div>
        <header className="site__header island">
          <div className="wrap">
            <span id="animationSandbox">
              <Animate type={animation}>
                <h1 className="site__title mega">
                  React Animate.css
                </h1>
              </Animate>
            </span>
            <span className="beta subhead">Just-add-water CSS animations</span>
          </div>
        </header>
        <main className="site__content island">
          <div className="wrap">
            <form>
              <select className="input input--dropdown js--animations" onChange={this.onAnimChange}>
                <optgroup label="Attention Seekers">
                  <option value="bounce">bounce</option>
                  <option value="flash">flash</option>
                  <option value="pulse">pulse</option>
                  <option value="rubberBand">rubberBand</option>
                  <option value="shake">shake</option>
                  <option value="swing">swing</option>
                  <option value="tada">tada</option>
                  <option value="wobble">wobble</option>
                  <option value="jello">jello</option>
                </optgroup>

                <optgroup label="Bouncing Entrances">
                  <option value="bounceIn">bounceIn</option>
                  <option value="bounceInDown">bounceInDown</option>
                  <option value="bounceInLeft">bounceInLeft</option>
                  <option value="bounceInRight">bounceInRight</option>
                  <option value="bounceInUp">bounceInUp</option>
                </optgroup>

                <optgroup label="Bouncing Exits">
                  <option value="bounceOut">bounceOut</option>
                  <option value="bounceOutDown">bounceOutDown</option>
                  <option value="bounceOutLeft">bounceOutLeft</option>
                  <option value="bounceOutRight">bounceOutRight</option>
                  <option value="bounceOutUp">bounceOutUp</option>
                </optgroup>

                <optgroup label="Fading Entrances">
                  <option value="fadeIn">fadeIn</option>
                  <option value="fadeInDown">fadeInDown</option>
                  <option value="fadeInDownBig">fadeInDownBig</option>
                  <option value="fadeInLeft">fadeInLeft</option>
                  <option value="fadeInLeftBig">fadeInLeftBig</option>
                  <option value="fadeInRight">fadeInRight</option>
                  <option value="fadeInRightBig">fadeInRightBig</option>
                  <option value="fadeInUp">fadeInUp</option>
                  <option value="fadeInUpBig">fadeInUpBig</option>
                </optgroup>

                <optgroup label="Fading Exits">
                  <option value="fadeOut">fadeOut</option>
                  <option value="fadeOutDown">fadeOutDown</option>
                  <option value="fadeOutDownBig">fadeOutDownBig</option>
                  <option value="fadeOutLeft">fadeOutLeft</option>
                  <option value="fadeOutLeftBig">fadeOutLeftBig</option>
                  <option value="fadeOutRight">fadeOutRight</option>
                  <option value="fadeOutRightBig">fadeOutRightBig</option>
                  <option value="fadeOutUp">fadeOutUp</option>
                  <option value="fadeOutUpBig">fadeOutUpBig</option>
                </optgroup>

                <optgroup label="Flippers">
                  <option value="flip">flip</option>
                  <option value="flipInX">flipInX</option>
                  <option value="flipInY">flipInY</option>
                  <option value="flipOutX">flipOutX</option>
                  <option value="flipOutY">flipOutY</option>
                </optgroup>

                <optgroup label="Lightspeed">
                  <option value="lightSpeedIn">lightSpeedIn</option>
                  <option value="lightSpeedOut">lightSpeedOut</option>
                </optgroup>

                <optgroup label="Rotating Entrances">
                  <option value="rotateIn">rotateIn</option>
                  <option value="rotateInDownLeft">rotateInDownLeft</option>
                  <option value="rotateInDownRight">rotateInDownRight</option>
                  <option value="rotateInUpLeft">rotateInUpLeft</option>
                  <option value="rotateInUpRight">rotateInUpRight</option>
                </optgroup>

                <optgroup label="Rotating Exits">
                  <option value="rotateOut">rotateOut</option>
                  <option value="rotateOutDownLeft">rotateOutDownLeft</option>
                  <option value="rotateOutDownRight">rotateOutDownRight</option>
                  <option value="rotateOutUpLeft">rotateOutUpLeft</option>
                  <option value="rotateOutUpRight">rotateOutUpRight</option>
                </optgroup>

                <optgroup label="Sliding Entrances">
                  <option value="slideInUp">slideInUp</option>
                  <option value="slideInDown">slideInDown</option>
                  <option value="slideInLeft">slideInLeft</option>
                  <option value="slideInRight">slideInRight</option>

                </optgroup>

                <optgroup label="Sliding Exits">
                  <option value="slideOutUp">slideOutUp</option>
                  <option value="slideOutDown">slideOutDown</option>
                  <option value="slideOutLeft">slideOutLeft</option>
                  <option value="slideOutRight">slideOutRight</option>

                </optgroup>

                <optgroup label="Zoom Entrances">
                  <option value="zoomIn">zoomIn</option>
                  <option value="zoomInDown">zoomInDown</option>
                  <option value="zoomInLeft">zoomInLeft</option>
                  <option value="zoomInRight">zoomInRight</option>
                  <option value="zoomInUp">zoomInUp</option>
                </optgroup>

                <optgroup label="Zoom Exits">
                  <option value="zoomOut">zoomOut</option>
                  <option value="zoomOutDown">zoomOutDown</option>
                  <option value="zoomOutLeft">zoomOutLeft</option>
                  <option value="zoomOutRight">zoomOutRight</option>
                  <option value="zoomOutUp">zoomOutUp</option>
                </optgroup>

                <optgroup label="Specials">
                  <option value="hinge">hinge</option>
                  <option value="rollIn">rollIn</option>
                  <option value="rollOut">rollOut</option>
                </optgroup>
              </select>

              <button className="butt" onClick={this.onAnimClick}>Animate it</button>
            </form>
            <hr />
            <p className="meta"><a href="https://raw.github.com/daneden/animate.css/master/animate.css" download="animate.css">Download Animate.css</a> or <a href="//github.com/daneden/animate.css">View on GitHub</a></p>
            <p><small>Another thing from <a href="//daneden.me">Daniel Eden</a>.</small></p>
            <p><small>With a little help from <a href="//sknkwrkz.io">Jon Brito</a>.</small></p>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

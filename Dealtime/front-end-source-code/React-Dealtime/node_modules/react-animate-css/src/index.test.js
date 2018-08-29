/* global it, describe, expect */
import React from 'react';
import { mount, shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import Animate from './index';

describe('<Animate />', () => {
  it('renders a basic animation', () => {
    const wrapper = mount(<Animate type="bounce">Test</Animate>);

    expect(wrapper.contains(<div className="animated bounce">Test</div>)).to.equal(true);
  });

  it('renders a transition group component', () => {
    const wrapper = shallow(<Animate enter="fadeInLeft">Test</Animate>);
    expect(wrapper.find('AnimateTransitionGroup')).to.have.length(1);
  });
});

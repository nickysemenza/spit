import React from 'react';
import { expect } from 'chai';
import {shallow} from 'enzyme';
import Opponents from './Game/Opponents';

describe('<Opponents />', () => {


  var hands = {
    "User 1": [[0, 1], [0, 2], [0, 3], [0, 4]],
    "User 2": [[0, 1], [0, 2], [0, 3], [0, 4]],
    "User 3": [[0, 1], [0, 2], [0, 3], [0, 4]]
  };

  var wrapper_opponents = shallow(<Opponents hands={hands} />);

  it('should render opponents wrapper', () => {
    expect(wrapper_opponents.find('.opponents')).to.have.length(1);
  });

  it('should render 2 opponent classes (for spacing)', () => {
    expect(wrapper_opponents.find('.opponent')).to.have.length(2);
  });

  it('should render 1 opponent rotated left', () => {
    expect(wrapper_opponents.find('.rotateleft')).to.have.length(1);
  });

  it('should render 1 opponent rotated right', () => {
    expect(wrapper_opponents.find('.rotateright')).to.have.length(1);
  });

  it('should render 3 hands', () => {
    expect(wrapper_opponents.find('.hands')).to.have.length(3);
  });

  it('should render 12 opponent cards', () => {
    expect(wrapper_opponents.find('.card')).to.have.length(12);
  });

  it('should render 12 opponent cards images', () => {
    expect(wrapper_opponents.find('.opcardimg')).to.have.length(12);
  });

  it('should render 1 if too many passed in (ex 4)', () => {
    hands["User 4"] = [[0, 1], [0, 2], [0, 3], [0, 4]];
    wrapper_opponents = shallow(<Opponents hands={hands} />);
    expect(wrapper_opponents.find('.hands')).to.have.length(1);
  });
});



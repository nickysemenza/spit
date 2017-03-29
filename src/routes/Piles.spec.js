import React from 'react';
import { expect } from 'chai';
import {shallow} from 'enzyme';
import Piles from './Game/Piles';

describe('<Piles />', () => {


  let piles = [51, 0, 0, 0];
  let clickedPile = function() { return; };
  let players = ["User 1", "User 2", "User 3", "User 4"];
  const wrapper_piles = shallow(
    <Piles
      clickedPile={clickedPile}
      piles={piles}
      players={players}
    />);

  it('should render piles', () => {
    expect(wrapper_piles.find('.piles')).to.have.length(1);
  });

  it('should render 4 cardimgs', () => {
    expect(wrapper_piles.find('.cardimg')).to.have.length(4);
  });

  it('should render 3 cards for outside piles and inner', () => {
    expect(wrapper_piles.find('.card')).to.have.length(3);
  });

  it('should render 1 center', () => {
    expect(wrapper_piles.find('.centercard')).to.have.length(1);
  });
});



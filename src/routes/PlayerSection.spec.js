import React from 'react';
import { expect } from 'chai';
import {shallow} from 'enzyme';
import PlayerSection from './Game/PlayerSection';

describe('<PlayerSection />', () => {


  let genericDeck = [1, 2, 3, 4, 5, 6, 7, 8];
  let selectedHand = 1;
  let clickedHand = function(hand) { return; };
  const wrapper_player_section = shallow(
    <PlayerSection
      card1={1}
      card2={2}
      card3={3}
      card4={4}
      decks={genericDeck}
      startTime={3}
      clickedHand={clickedHand}
      selectedHand={selectedHand}
    />);

  it('should render cardlayout', () => {
    expect(wrapper_player_section.find('.cardlayout')).to.have.length(1);
  });

   it('should render 4 cards', () => {
    expect(wrapper_player_section.find('.card')).to.have.length(4);
  });

   it('should render 4 cardimgs', () => {
    expect(wrapper_player_section.find('.cardimg')).to.have.length(4);
  });

   it('should render leaderboard wrapper', () => {
    expect(wrapper_player_section.find('.mainLB')).to.have.length(1);
  });

    it('should render game leaderboard', () => {
    expect(wrapper_player_section.find('.gameLeaderboard')).to.have.length(1);
  });

   it('should render game leaderboard table', () => {
    expect(wrapper_player_section.find('table')).to.have.length(1);
  });

   it('should render four hand buttons', () => {
    expect(wrapper_player_section.find('.cardButton')).to.have.length(4);
  });

    it('should have one card selected at all times', () => {
    expect(wrapper_player_section.find('.cardButton-selected')).to.have.length(1);
  });

  it('should have a deck', () => {
    expect(wrapper_player_section.find('.mainDeck')).to.have.length(1);
  });

  it('should have a deck with an empty image', () => {
    expect(wrapper_player_section.find('.deckimg')).to.have.length(1);
  });
});



import React from 'react';
import { expect } from 'chai';
import {shallow} from 'enzyme';
import Leaderboard from './Leaderboard/Leaderboard';

describe('<Leaderboard />', () => {
  let leaderboard = {
    ranking: [{username: "user1", gamesWon: "1", gamesPlayed: "1", totalScore: "1"}]
  };

  var wrapper_leaderboard = shallow(<Leaderboard leaderboard={leaderboard} />);

  it('should contain left banner', () => {
    expect(wrapper_leaderboard.find('.leftBanner')).to.have.length(1);
  });

  it('should contain right banner', () => {
    expect(wrapper_leaderboard.find('.rightBanner')).to.have.length(1);
  });

  it('should contain 5 table headers', () => {
    expect(wrapper_leaderboard.find('th')).to.have.length(5);
  });

  it('should render info container', () => {
    expect(wrapper_leaderboard.find('.infoContain')).to.have.length(1);
  });

  it('should contain tbody (for react purposes)', () => {
    expect(wrapper_leaderboard.find('tbody')).to.have.length(1);
  });

  it('should render leaderboard header', () => {
    expect(wrapper_leaderboard.find('h1')).to.have.length(1);
  });

  it('should render table', () => {
    expect(wrapper_leaderboard.find('table')).to.have.length(1);
  });

  it('should render one user with one rank', () => {
    expect(wrapper_leaderboard.find('tr')).to.have.length(2);
  });

  it('should render 3 users with 2 ranks', () => {
    leaderboard.ranking.push({username: "user2", gamesWon: "1", gamesPlayed: "1", totalScore: "1"});
    wrapper_leaderboard = shallow(<Leaderboard leaderboard={leaderboard} />);

    expect(wrapper_leaderboard.find('tr')).to.have.length(3);
  });

  it('should render 6 users with 6 ranks', () => {
    leaderboard.ranking.push({username: "user3", gamesWon: "1", gamesPlayed: "1", totalScore: "1"});
    leaderboard.ranking.push({username: "user4", gamesWon: "1", gamesPlayed: "1", totalScore: "1"});
    leaderboard.ranking.push({username: "user5", gamesWon: "1", gamesPlayed: "1", totalScore: "1"});
    wrapper_leaderboard = shallow(<Leaderboard leaderboard={leaderboard} />);

    expect(wrapper_leaderboard.find('tr')).to.have.length(6);
  });

});



import React from 'react';
import { expect } from 'chai';
import {shallow} from 'enzyme';
import Landing from './Landing/Landing';

describe('<Landing />', () => {
  it('should only display signup form when not logged in', () => {
    const wrapper_guest = shallow(<Landing user={{authenticated: false}}/>);
    const actual_guest = wrapper_guest.find('.usernameInput');
    // expect(actual_guest).to.have.length(1);

    const wrapper_authd = shallow(<Landing user={{authenticated: true}}/>);
    const actual_authd = wrapper_authd.find('.usernameInput');
    // expect(actual_authd).to.have.length(0);
  });
  //
  it('should show logo and leaderboard button', () => {


    const wrapper = shallow(<Landing user={{authenticated: false}}/>);

    const actual = wrapper.find('.logoIMG');
    const actual2 = wrapper.find('.leaderboardBttn');

    expect(actual).to.have.length(1);
    expect(actual2).to.have.length(1);
  });

});



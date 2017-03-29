import React from 'react';
import { expect } from 'chai';
import {shallow} from 'enzyme';
import Landing from './Landing/Landing';

describe('<Landing />', () => {
  it('should render landing container', () => {
    const wrapper_landing = shallow(<Landing user={{authenticated: true}}/>);
    expect(wrapper_landing.find('.landingContain')).to.have.length(1);
  });

  it('should display play button if authenticated', () => {
    const wrapper_landing = shallow(<Landing user={{authenticated: true}}/>);
    expect(wrapper_landing.find('.playNowBttn')).to.have.length(1);
  });

  it('should display a lobby button', () => {
    const wrapper_landing = shallow(<Landing user={{authenticated: true}}/>);
    expect(wrapper_landing.find('.lobbyBttn')).to.have.length(1);
  });

  it('should display a instruction button', () => {
    const wrapper_landing = shallow(<Landing user={{authenticated: true}}/>);
    expect(wrapper_landing.find('.instructionBttn')).to.have.length(1);
  });

   it('should display logout button when logged in', () => {
    const wrapper_landing = shallow(<Landing user={{authenticated: true}}/>);
    expect(wrapper_landing.find('.logoutBttn')).to.have.length(1);
  });

   it('should not display logout button when logged out', () => {
    const wrapper_landing = shallow(<Landing user={{authenticated: false}}/>);
    expect(wrapper_landing.find('.logoutBttn')).to.have.length(0);
  });

   it('should not display signup form when not logged in', () => {
    const wrapper_guest = shallow(<Landing user={{authenticated: false}}/>);
    const actual_guest = wrapper_guest.find('.usernameInput');

    expect(actual_guest).to.have.length(1);
  });

  it('should display signup form when logged in', () => {
    const wrapper_authd = shallow(<Landing user={{authenticated: true}}/>);
    const actual_authd = wrapper_authd.find('.usernameInput');

    expect(actual_authd).to.have.length(0);
  });

  it('should show leaderboard button', () => {
    const wrapper = shallow(<Landing user={{authenticated: false}}/>);
    const actual = wrapper.find('.homepageBttn');

    expect(actual).to.have.length(2);
  });

  it('should display the logo', () => {
    const wrapper = shallow(<Landing user={{authenticated: false}}/>);
    const actual = wrapper.find('.logoIMG');

    expect(actual).to.have.length(1);
  });
});



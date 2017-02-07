let expect = require('chai').expect;
let utils = require('./utils');
// import { expect } from 'chai';

describe('Utils::areCardsSameNumber', () => {

  it('one zero/null card', () => {
    expect(utils.areCardsSameNumber(0,2)).to.equal(false);
  });
  it('two cards of same suit', () => {
    expect(utils.areCardsSameNumber(2,2)).to.equal(true);
  });
  it('two cards of different suit', () => {
    expect(utils.areCardsSameNumber(2,15)).to.equal(true);
  });
  it('two cards of different suit and differnt number', () => {
    expect(utils.areCardsSameNumber(2,14)).to.equal(false);
  });
});

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
  it('two cards of different suit and different number', () => {
    expect(utils.areCardsSameNumber(2,14)).to.equal(false);
  });
});
describe('Utils::areCardsSequential', () => {

  it('one zero/null card', () => {
    expect(utils.areCardsSequential(0,2)).to.equal(false);
  });
  it('two cards of same suit', () => {
    expect(utils.areCardsSequential(2,3)).to.equal(true);
  });
  it('two cards of different suit', () => {
    expect(utils.areCardsSequential(2,16)).to.equal(true);
    expect(utils.areCardsSequential(4,16)).to.equal(true);
  });
  it('two cards of different suit and same number', () => {
    expect(utils.areCardsSequential(2,15)).to.equal(false);
  });
  it('A king and a queen of different suits', () => {
    expect(utils.areCardsSequential(12,13)).to.equal(true);
  });
  it('A king and a queen of same suit', () => {
    expect(utils.areCardsSequential(25,13)).to.equal(true);
    expect(utils.areCardsSequential(13,25)).to.equal(true);
  });
});

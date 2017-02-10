let expect = require('chai').expect;
let utils = require('./utils');

describe('Utils::areCardsSameNumber', () => {

  it('2-club should not equal the 0 card', () => {
    expect(utils.areCardsSameNumber(0,2)).to.equal(false);
  });
  it('K-diamond should not equal the 0 card', () => {
    expect(utils.areCardsSameNumber(0,39)).to.equal(false);
  });
  it('K-diamond should equal K-spade', () => {
    expect(utils.areCardsSameNumber(26,39)).to.equal(true);
  });
  it('2-club should equal 2-club', () => {
    expect(utils.areCardsSameNumber(2,2)).to.equal(true);
  });
  it('2-club should equal 2-spade', () => {
    expect(utils.areCardsSameNumber(2,15)).to.equal(true);
  });
  it('2-club should not equal 1-spade', () => {
    expect(utils.areCardsSameNumber(2,14)).to.equal(false);
  });
});
describe('Utils::areCardsSequential', () => {

  it('2-club should not be next to the 0 card', () => {
    //TODO: is this the logic we want?
    expect(utils.areCardsSequential(0,2)).to.equal(false);
  });
  it('2-club and 3-club should be sequential', () => {
    expect(utils.areCardsSequential(2,3)).to.equal(true);
  });
  it('2-club and 3-spade should be sequential', () => {
    expect(utils.areCardsSequential(2,16)).to.equal(true);
  });
  it('4-diamond and 3-spade should be sequential', () => {
    expect(utils.areCardsSequential(30,16)).to.equal(true);
  });
  it('2-club and 2-spade should not be sequential', () => {
    expect(utils.areCardsSequential(2,15)).to.equal(false);
    expect(utils.areCardsSequential(15,2)).to.equal(false);
  });
  it('Q-club and K-club should be sequential', () => {
    expect(utils.areCardsSequential(12,13)).to.equal(true);
    expect(utils.areCardsSequential(13,12)).to.equal(true);
  });
  it('Q-spade and K-club should be sequential', () => {
    expect(utils.areCardsSequential(25,13)).to.equal(true);
    expect(utils.areCardsSequential(13,25)).to.equal(true);
  });
});

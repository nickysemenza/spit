import { expect } from 'chai';
import * as ActionTypes from '../actions/leaderboardActions';
import reducer from './leaderboardReducer';

describe('Reducers::leaderboardReducer', () => {
  const getInitialState = () => {
    return { ranking: {}, lastUpdated: null, loading: false };
  };
  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).to.deep.equal(expected); // Notice use of deep because it's a nested object
    // expect(reducer(undefined, action)).to.equal(expected); // Fails. Not deeply equal
  });
});

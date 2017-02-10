/**
 * Created by martykausas on 2/9/17.
 */


import React, { Component, PropTypes } from 'react';

export default class Piles extends Component {
  render() {
    return (
      <div className="piles">

        <div className="card">
          <img className="cardimg" src="https://goo.gl/DfIK1m" />
        </div>

        <div className="card centercard">
          <img className="cardimg" src="https://goo.gl/DfIK1m" />
          <img className="cardimg" src="https://goo.gl/DfIK1m" />

        </div>

        <div className="card">
          <img className="cardimg" src="https://goo.gl/DfIK1m" />
        </div>
      </div>
    );
  }
}


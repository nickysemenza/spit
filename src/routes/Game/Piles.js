/**
 * Created by martykausas on 2/9/17.
 */


import React, { Component, PropTypes } from 'react';

export default class Piles extends Component {
  render() {
    let player1 = this.props.piles ? Object.keys(this.props.piles)[0] : null;
    let player1Card = player1 ? this.props.piles[player1] : 0;

    let player2 = this.props.piles ? Object.keys(this.props.piles)[1] : null;
    let player2Card = player1 ? this.props.piles[player1] : 0;

    let player3 = this.props.piles ? Object.keys(this.props.piles)[2] : null;
    let player3Card = player1 ? this.props.piles[player1] : 0;

    let player4 = this.props.piles ? Object.keys(this.props.piles)[3] : null;
    let player4Card = player1 ? this.props.piles[player1] : 0;
    return (
      <div className="piles">

        <div className="card">
          <img className="cardimg" src={`../../assets/cards/${player1Card}.png`} />
        </div>

        <div className="card centercard">
          <img className="cardimg" src={`../../assets/cards/${player2Card}.png`} />
          <img className="cardimg" src={`../../assets/cards/${player3Card}.png`} />

        </div>

        <div className="card">
          <img className="cardimg" src={`../../assets/cards/${player4Card}.png`} />
        </div>
      </div>
    );
  }
}


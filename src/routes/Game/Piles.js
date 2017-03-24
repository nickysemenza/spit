/**
 * Created by martykausas on 2/9/17.
 */


import React, { Component, PropTypes } from 'react';

export default class Piles extends Component {
  render() {
    return (
      <div className="piles">

        <div className="card">
          <img className="cardimg" onClick={()=>{this.props.clickedPile(this.props.players[0]);}} src={`../../assets/cards/${this.props.piles[0]}.png`} />
        </div>

        <div className="card centercard">
          <img className="cardimg" onClick={()=>{this.props.clickedPile(this.props.players[1]);}} src={`../../assets/cards/${this.props.piles[1]}.png`} />
          <img className="cardimg" onClick={()=>{this.props.clickedPile(this.props.players[2]);}} src={`../../assets/cards/${this.props.piles[2]}.png`} />
        </div>

        <div className="card">
          <img className="cardimg" onClick={()=>{this.props.clickedPile(this.props.players[3]);}} src={`../../assets/cards/${this.props.piles[3]}.png`} />
        </div>
      </div>
    );
  }
}


/**
 * Created by martykausas on 2/9/17.
 */

import React, {Component} from 'react';


export default class Opponents extends Component {

  constructor(props) {
    super(props);
    this.names = Object.keys(this.props.hands);
    this.playerCount = this.names.length || 0;
    this.getHandDivs = this.getHandDivs.bind(this);
    this.mapPlayersToHands = this.mapPlayersToHands.bind(this);

    // represents mapping of player to their hands
    this.handPlayerMap = [];
    this.mapPlayersToHands();


    this.emptyHand = (<div className="hands">
      <div className="card">
        <img className="opcardimg" src={`../../assets/cards/0.png`} />
      </div>

      <div className="card">
        <img className="opcardimg" src={`../../assets/cards/0.png`} />
      </div>

      <div className="card">
        <img className="opcardimg" src={`../../assets/cards/0.png`} />
      </div>

      <div className="card">
        <img className="opcardimg" src={`../../assets/cards/0.png`} />
      </div>
    </div>);
  }

  getHandDivs(hand) {
    if (hand == -1 || hand > this.playerCount - 1)
      return this.emptyHand;



    let handUser = this.names[hand];
    let allHands = this.props.hands;
    console.log("handuser = " + handUser);
    console.log("allhands = " + Object.keys(allHands));
    let handCards = allHands[handUser];
    console.log("handCards = " + handCards);
    return (
      <div>
        {handUser}
        <div className="hands">
          <div className="card">
            <img className="opcardimg" src={`../../assets/cards/${handCards[0][1]}.png`} />
          </div>

          <div className="card">
            <img className="opcardimg" src={`../../assets/cards/${handCards[1][1]}.png`} />
          </div>

          <div className="card">
            <img className="opcardimg" src={`../../assets/cards/${handCards[2][1]}.png`} />
          </div>

          <div className="card">
            <img className="opcardimg" src={`../../assets/cards/${handCards[3][1]}.png`} />
          </div>
        </div>
      </div>
    );
  }
  mapPlayersToHands() {
    switch (this.playerCount) {
      case 1:
        this.handPlayerMap = [-1, 0, -1];
        break;
      case 2:
        this.handPlayerMap = [0, -1, 1];
        break;
      case 3:
        this.handPlayerMap = [0, 1, 2];
        break;
      default:
        this.handPlayerMap = [-1, -1, -1];
    }
  }

  render() {
    if (!this.handPlayerMap) this.mapPlayersToHands();
    console.log(this.names);

    return (
      <div className="opponents">
        <div className="opponent" />
        <div className="rotateleft">
          {this.getHandDivs(this.handPlayerMap[0])}
        </div>

        <div>
          {this.getHandDivs(this.handPlayerMap[1])}
        </div>

        <div className="rotateright">
          {this.getHandDivs(this.handPlayerMap[2])}
        </div>
        <div className="opponent" />
      </div>

    );
  }
}


/**
 * Created by martykausas on 2/9/17.
 */


import React, {Component, PropTypes} from 'react';


export default class PlayerSection extends Component {

  render() {
    let card1 = (this.props.card1 && this.props.card1.length !=0) ? this.props.card1[0] : 0;
    let card2 = (this.props.card2 && this.props.card2.length !=0) ? this.props.card2[0] : 0;
    let card3 = (this.props.card3 && this.props.card3.length !=0) ? this.props.card3[0] : 0;
    let card4 = (this.props.card4 && this.props.card4.length !=0) ? this.props.card4[0] : 0;

    let decks = this.props.decks ? this.props.decks : {};
    let gameLB = Object.keys(decks).map(k=>
      <tr key={k}>
      <td>{k}</td>
      <td>{this.props.decks[k]}</td>
    </tr>);
    return (
      <div>

      <div className="cardlayout">

        <div className="mainDeck">
          <img className="deckimg" src="../../assets/cards/0.png" />
        </div>

        <div className="hands">
          <div className="card">
            <img className="cardimg" src={`../../assets/cards/${card1}.png`} />
            <div className={this.props.selectedHand == 1 ? 'cardButton cardButton-selected' : 'cardButton'}>1</div>
          </div>

          <div className="card">
            <img className="cardimg" src={`../../assets/cards/${card2}.png`} />
              <div className={this.props.selectedHand == 2 ? 'cardButton cardButton-selected' : 'cardButton'}>2</div>
          </div>

          <div className="card">
            <img className="cardimg" src={`../../assets/cards/${card3}.png`} />
              <div className={this.props.selectedHand == 3 ? 'cardButton cardButton-selected' : 'cardButton'}>3</div>
          </div>

          <div className="card">
            <img className="cardimg" src={`../../assets/cards/${card4}.png`} />
              <div className={this.props.selectedHand == 4 ? 'cardButton cardButton-selected' : 'cardButton'}>4</div>
          </div>
        </div>

        <div className="mainLB">
          <table className="gameLeaderboard">
            {gameLB}
          </table>
        </div>
      </div>
    </div>
  );
  }
}
PlayerSection.propTypes = {
  card1: PropTypes.array.isRequired,
  card2: PropTypes.array.isRequired,
  card3: PropTypes.array.isRequired,
  card4: PropTypes.array.isRequired,
  decks: PropTypes.object.isRequired,
  selectedHand: PropTypes.number
};

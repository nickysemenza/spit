/**
 * Created by martykausas on 2/9/17.
 */


import React, {Component, PropTypes} from 'react';


export default class PlayerSection extends Component {

  render() {
    return (
      <div>

      <div className="cardlayout">

        <div className="mainDeck">
          <img className="deckimg" src="../../assets/cards/0.png" />
        </div>

        <div className="hands">
          <div className="card">
            <img className="cardimg" src={`../../assets/cards/${this.props.card1}.png`} />
            <div className="cardButton">1</div>
          </div>

          <div className="card">
            <img className="cardimg" src={`../../assets/cards/${this.props.card2}.png`} />
              <div className="cardButton">1</div>
          </div>

          <div className="card">
            <img className="cardimg" src={`../../assets/cards/${this.props.card3}.png`} />
              <div className="cardButton">2</div>
          </div>

          <div className="card">
            <img className="cardimg" src={`../../assets/cards/${this.props.card4}.png`} />
              <div className="cardButton">4</div>
          </div>
        </div>

        <div className="mainLB">
          <table>
            <tr>
              <td>Marty</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Nicky</td>
              <td>11</td>
            </tr>
            <tr>
              <td>Byron</td>
              <td>19</td>
            </tr>
            <tr>
              <td>Austin</td>
              <td>23</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
  }
}


PlayerSection.propTypes = {
  card1: PropTypes.number.isRequired,
  card2: PropTypes.number.isRequired,
  card3: PropTypes.number.isRequired,
  card4: PropTypes.number.isRequired
}

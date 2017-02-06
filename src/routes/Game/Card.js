/**
 * Created by martykausas on 2/6/17.
 */

import React, { Component, PropTypes } from 'react';

export default class Card extends Component {
  render() {
    return (
      <div>
        <img src={`../../assets/cards/${this.props.type}.png`} />
      </div>
    );
  }
}

Card.propTypes = {
  // if needed, add validation
  type: PropTypes.number.isRequired
}

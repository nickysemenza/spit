import React, { Component } from 'react';
import GameContainer from './GameContainer';
class GamePage extends Component {
  render () {
    return (
      <div className="container-fluid">
        <GameContainer game_id={this.props.params.game_id} />
      </div>
    );
  }
}

export default GamePage;

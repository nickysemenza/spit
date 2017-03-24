import React, { Component } from 'react';
import ReplayContainer from './ReplayContainer';
class ReplayPage extends Component {
  componentDidMount() {

  }
  render () {
    return (
      <div className="container-fluid">
        <ReplayContainer game_id={this.props.params.game_id}/>
      </div>
    );
  }
}

export default ReplayPage;

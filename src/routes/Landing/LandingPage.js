import React, { Component } from 'react';
import LandingContainer from './LandingContainer';
class LandingPage extends Component {
  render () {
    return (
      <div className="container-fluid">
        <LandingContainer routerProps={this.props}/>
      </div>
    );
  }
}
export default LandingPage;

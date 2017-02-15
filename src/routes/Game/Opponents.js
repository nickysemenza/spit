/**
 * Created by martykausas on 2/9/17.
 */

import React, {Component} from 'react';


export default class Opponents extends Component {

  render() {
    return (
      <div className="opponents">
        <div className="opponent" />
        <div className="rotateleft">
          <img className="opdeckimg" src="https://goo.gl/II2O3o" />

          <div className="hands">
            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>

            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>

            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>

            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>
          </div>
        </div>

        <div>
          <img className="opdeckimg" src="https://goo.gl/II2O3o" />
          <div className="hands">
            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>

            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>

            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>

            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>
          </div>
        </div>

        <div className="rotateright">
          <img className="opdeckimg" src="https://goo.gl/II2O3o" />

          <div className="hands">
            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>

            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>

            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>

            <div className="card">
              <img className="opcardimg" src="https://goo.gl/DfIK1m" />
            </div>
          </div>
        </div>
        <div className="opponent" />
      </div>

    );
  }
}


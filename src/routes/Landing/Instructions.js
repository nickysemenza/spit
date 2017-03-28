import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
export default class Instructs extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className="infoContain">
        <img src="../../assets/logo.png" className="logoIMG" alt="SpitON.US Logo" />
        <ul className="sects" >
          Description
        </ul>
        <div className="minisects">
          <ol> SpitOn.us is a online card game. The game is all about speed, it is not turn based.</ol>
          <ol> A match can be played with 2-4 players, with each player is given a deck with 52 cards, a hand with 4 cards, and a pile to share with others. </ol>
        </div>
        <ul className="sects"> Objective </ul>
        <ul className="minisects">
          <ol> The objective of Spit is to get rid of your cards as quickly as possible. </ol>
        </ul>
        <ul className="sects"> Layout </ul>
        <ul className="sects">
          <img src="../../assets/Instructions/Layout.png" className="layoutIMG" alt="Layout" />
          <div className="descContain">
            <ol> Opponent's Hand: Your Opponents' hands are displayed at the top of the screen. </ol>
            <ol> Pile: There is a pile for each player in the game.</ol>
            <ol> Deck: Each player has a deck however yours is the only one avaliable to see.</ol>
            <ol> Your Hand: Your hand shows your playable cards.</ol>
            <ol> Leaderboard: The Leaderboard show game time, and ranks players by cards held.</ol>
          </div>
        </ul>



        <ul className="sects">

        </ul> <ul className="sects"> Moves </ul>
        <ul className="minisects">
          <ol > There are only three moves possible in the game: </ol>
        </ul>
        <ul className="minisects">

          <ol> •	Play Card – play a card from your hand to a pile that has a card value (+/-)1 from your cards value.</ol>
          <ol> •	Card Stack – move a card from your hand to stack on another card with equal value on in your hand. </ol>
          <ol> •	Deck Request – take a card from your deck and place it in an empty spot on your hand. </ol>
        </ul>
        <ul className="sects"> How to play a card </ul>
        <ul className="gifsects">
          <img src="../../assets/Instructions/cardSelect.gif" className="tempIMG" alt="CardSelect" />
          <ol> Use the corresponding number key to select a card. </ol>
        </ul>
        <ul className="gifsects">
          <img src="../../assets/Instructions/playingCard.gif" className="layoutIMG" alt="PlayCard" />
          <ol> Click on a pile to place the selected card in the pile. </ol>
        </ul>
        <ul className="sects"> How to stack </ul>
        <ul className="gifsects">
          <img src="../../assets/Instructions/cardStacking.gif" className="layoutIMG" alt="CardStacking" />
          <ol>  play a card of equal value on another card in your hand </ol>
        </ul>
        <ul className="sects"> How to pull from deck </ul>
        <ul className="gifsects">
          <img src="../../assets/Instructions/pullingDeck.gif" className="layoutIMG" alt="PullingDeck" />
          <ol> Use the spacebar to pull a card from your deck. </ol>
        </ul>

        <ul className="sects"> Putting everything you learned together! </ul>
        <ul className="sects">
          <img src="../../assets/Instructions/playingCards.gif" className="playIMG" alt="PlayingCards" />
        </ul>
        <div className="sects">
          <a href="/"><button className="homepageBttn">Home</button></a>
        </div>
      </div>
    );
  }
}

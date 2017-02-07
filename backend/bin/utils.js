function areCardsSameNumber(card1, card2) {
  if(card1==0 || card2 == 0)
    return false;
  return (card1%13 == card2%13)
}
function areCardsSequential(card1, card2) {

}

module.exports = {
  areCardsSameNumber,
  areCardsSequential
};

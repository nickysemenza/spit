function areCardsSameNumber(card1, card2) {
  if(card1==0 || card2 == 0)
    return false;
  return (card1%13 == card2%13)
}
function areCardsSequential(card1, card2) {
  if(card1==0 || card2 == 0)
    return false;
  let card1Mod = card1%13;
  let card2Mod = card2%13;
  if((card1Mod==12 && card2Mod==0) || (card1Mod==0 && card2Mod==12))
    return true;
  let diff = Math.abs(card1Mod - card2Mod);
  return diff == 1;
}

module.exports = {
  areCardsSameNumber,
  areCardsSequential
};

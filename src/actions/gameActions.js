
export const RECEIVE_GAME_STATE = 'RECEIVE_GAME_STATE';

export function receiveGameState (json) {
  return {
    type: RECEIVE_GAME_STATE,
    state: json,
    receivedAt: Date.now()
  };
}

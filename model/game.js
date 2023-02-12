export const NewGame = (playerId) => {
  const players = {}
  players[playerId] = {}
  return {
    players,
    turnOrder: ["bot", "playerId1", "bot", "playerId2"],
    currentState: {
      state: "NOT_STARTED",
      totalTime: 300,
    },
  }
}

import firestoreDb from "@/db/firestore"
import { NewGame } from "@/model/game"
import {Timestamp} from "firebase-admin/firestore"

export const CreateGameInStorage = async (playerId) => {
  const game = NewGame(playerId)
  const db = firestoreDb()
  const res = await db.collection('games').withConverter(gameConverter).add(game)
  return res.id
}

export const JoinGameInStorage = async (gameId, playerId) => {
  const db = firestoreDb()
  const gameRef = db.collection('games').withConverter(gameConverter).doc(gameId)
  await db.runTransaction(async (t) => {
    const gameSnap = await t.get(gameRef)
    const game = gameSnap.data()
    const players = game.players
    if(Object.keys(players).length == 1 && game.currentState.state === "NOT_STARTED"){
      if(!players[playerId]){
        // start game here. 
        players[playerId] = {}
        game.players = players
        await t.set(gameRef, game)
      }
    } else {
      throw new Error("Game should have exactly 1 current player")
    }
  })
  return gameId
}

export const GetGameFromStorage = async (gameId) => {
  const db = firestoreDb()
  console.log(gameId)
  const gameSnap = await db.collection('games').withConverter(gameConverter).doc(gameId).get()
  return gameSnap.data()
}

const gameConverter = {
  toFirestore: (game) => {
    console.log(game)
    return Object.assign(game, {stateChangedAt: Timestamp.now()})
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    delete data.stateChangedAt
    return data
  }
};

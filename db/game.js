import firestoreDb from "@/db/firestore"
import {Timestamp} from "firebase-admin/firestore"

export const CreateGameInStorage = async (game) => {
  const db = firestoreDb()
  const res = await db.collection('games').withConverter(gameConverter).add(game)
  return res.id
}

export const GetGameFromStorage = async (gameId) => {
  const db = firestoreDb()
  console.log(gameId)
  const gameSnap = await db.collection('games').withConverter(gameConverter).doc(gameId).get()
  return gameSnap.data()
}

const gameConverter = {
  toFirestore: (game) => {
    return Object.assign(game, {stateChangedAt: Timestamp.now()})
  },
  fromFirestore: (snapshot,options) => {
    const data = snapshot.data(options);
    delete data.stateChangedAt
    return data
  }
};

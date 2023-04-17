import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"

const createGame = async (router, apiCallCompleted) => {
  const playerData = await loadPlayerData()
  const resp = await api.call("createGame", {playerId: playerData.id})
  apiCallCompleted()
  if(resp.error) {
    console.log(resp.error)
  } else {
    const gameId = resp.result.gameId
    router.push(`/game/join/${gameId}`)
  }
}

export {
  createGame
}

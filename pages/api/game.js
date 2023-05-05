import GrpcService from "@/lib/grpc_service"
import getLoggedInUserEmail from "@/common/logged_in_user"

const createGame = async (userEmail, params) => {
  if(!params.playerId){
    return {result: null, err: "playerId is required"}
  }
  if(!params.publicGame){
    return {result: null, err: "publicGame is required"}
  }
  try {
    const {gameId} = await GrpcService.createGame(userEmail, params.playerId, params.publicGame)
    return {result: {gameId}, err:null}
  } catch (err){
    console.log(err)
    return {result: null, err}
  }
}

const getGame = async (userEmail, params) => {
  if(!params.gameId){
    return {result: null, err: "gameId is required"}
  }
  try {
    const game = await GrpcService.getGameForPlayer(userEmail, params.gameId, params.playerId)
    return {result: {game}, err:null}
  } catch (err){
    console.log(err)
    return {result: null, err}
  }
}

const autoJoinGame = async (userEmail, params) => {
  try {
    await GrpcService.autoJoinGame(userEmail, params.playerId)
    return {result: {gameId: params.gameId}, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const joinGame = async (userEmail, params) => {
  if(!params.gameId){
    return {result: null, err: "gameId is required"}
  }
  try {
    await GrpcService.joinGame(userEmail, params.gameId, params.playerId)
    return {result: {gameId: params.gameId}, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const sendMessage = async (userEmail, params) => {
  if(!params.gameId || !params.playerId || !params.botId || !params.text || !params.type){
    return {result: null, err: "gameId, playerId, botId, text and type is required"}
  }
  try {
    await GrpcService.sendMessage(userEmail, params.gameId, params.playerId, params.botId, params.text, params.type)
    return {result: null, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const getGameIds = async (userEmail, params) => {
  if(!params.playerId){
    return {result: null, err: "playerId is required"}
  }
  try {
    const gameIds = await GrpcService.getGamesForPlayer(userEmail, params.playerId)
    return {result: gameIds, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const tag = async (userEmail, params) => {
  if(!params.gameId || !params.playerId || !params.botId){
    return {result: null, err: "gameId, playerId, botId is required"}
  }
  try {
    await GrpcService.tag(userEmail, params.gameId, params.playerId, params.botId)
    return {result: null, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const help = async (userEmail, params) => {
  if(!params.gameId || !params.playerId){
    return {result: null, err: "gameId, playerId is required"}
  }
  try {
    const helpText = await GrpcService.help(userEmail, params.gameId, params.playerId)
    return {result: {text: helpText.text}, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const functionMap = {
  "createGame": createGame,
  "autoJoinGame": autoJoinGame,
  "joinGame": joinGame,
  "getGame": getGame,
  "sendMessage": sendMessage,
  "getGameIds": getGameIds,
  "tag": tag,
  "help": help,
}

const Game = async (req, res) => {
  if(req.method !== "POST") {
    res.status(404).json({error: "only POST is allowed"})
    return
  }

  if(req.body && req.body["action"]) {
    const action = req.body.action
    const actionFunc = functionMap[action]
    if(!actionFunc) {
      res.status(400).json({error: "unknown action requested"})
      return
    }
    if(!req.body.params) {
      res.status(400).json({error: "empty params not allowed"})
      return
    }
    if(!req.body.params.playerId) {
      res.status(400).json({error: "valid player id is required"})
      return
    }

    const email = await getLoggedInUserEmail(req, res)
    const {result, err} = await actionFunc(email, req.body.params)
    res.status(200).json({result: result, error: err})
  } else {
    res.status(400).json({error: "improper request"})
  }
}

export default Game
